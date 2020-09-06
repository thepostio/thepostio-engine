// import { useRouter } from 'next/router'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { parseISO, format } from 'date-fns'
import hljs from 'highlight.js'
import { Breadcrumb, Card, Tooltip, Avatar, Button, Divider } from 'antd'
import {
  FrownOutlined,
  TwitterCircleFilled,
  GithubFilled,
  ReadOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import { getAuthorData, getPostData } from '../../server/data'
import { incrementVisit, getRanking } from '../../server/metrics'
import MainLayout from '../../components/MainLayout'
import UrlBuilder from '../../core/UrlBuilder'
import styles from './styles.module.css'
const { Meta } = Card;


class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this._htmlDivRef = React.createRef()
  }

  highlight = () => {
    if (!this.state.editionMode && this._htmlDivRef.current) {
        const nodes = this._htmlDivRef.current.querySelectorAll('pre')
        nodes.forEach((node) => {
          hljs.highlightBlock(node)
        })
    }
  }


  componentDidMount() {
    this.highlight()
  }

  render() {
    const router = this.props.router
    const { username, postid } = router.query
    const userData = this.props.userData
    const articleData = this.props.articleData
    const provider = this.props.provider


    if (userData.error || articleData.error) {
      console.log('userData.error', userData.error)
      console.log('articleData.error', articleData.error)
      return (
        <MainLayout>
          <div
            style={{
              textAlign: 'center',
              color: '#ffbb74',
              marginTop: '3em',
            }}
          >
            <FrownOutlined style={{fontSize: '7em'}}/>
            <div style={{
                fontSize: '1.5em',
                marginTop: '2em',
              }}
            >
              {userData.error || articleData.error}
            </div>
          </div>
        </MainLayout>
      )
    }


    // const router = useRouter()
    
    const properties = articleData.data.properties
    const date = parseISO(properties.date)
    const niceDate = format(date, 'LLLL d, yyyy')

    let headerCard = null

    if (properties.cover) {
      headerCard = (
        <div
          className={styles.headercard}
        >
          <div
            className={styles.titlewrapper}
          >
            <div className={styles.titleuser}>{userData.data.author.displayName}</div>
            <h1 className={styles.title}>{properties.title}</h1>
            <div className={styles.nicedate}>{niceDate}</div>
          </div>
          <div className={styles.headercarddarkgb} />
          <div
          className={styles.headercardbgpicture}
            style={{
              background: `url(${properties.cover}) no-repeat center center`,
              backgroundSize: 'cover',
            }}
          >
          </div>
        </div>
      )
    } else {
      headerCard = (
        <div
          className={styles.headercardnocover}
        >
          <div
            className={styles.titlewrapper}
          >
            <div className={styles.titleusernocover}>{userData.data.author.displayName}</div>
            <h1 className={styles.titlenocover}>{properties.title}</h1>
            <div className={styles.nicedatenocover}>{niceDate}</div>
          </div>
        </div>
      )
    }

    

    const cardActions = [
      <Link href={`/${username}`}><Tooltip title='More articles' color='blue'>
        <a style={{fontSize: '2em'}}><ReadOutlined /></a>
      </Tooltip></Link>
    ]

    if (userData.data.author.website) {
      cardActions.push(
        <Tooltip title='Visit website' color='blue'>
          <a style={{fontSize: '2em'}} href={userData.data.author.website}><GlobalOutlined /></a>
        </Tooltip>
      )
    }

    if (userData.data.author.twitter) {
      cardActions.push(
        <Tooltip title='See Twitter profile' color='blue'>
          <a style={{fontSize: '2em'}} href={`https://twitter.com/${userData.data.author.twitter}`}><TwitterCircleFilled /></a>
        </Tooltip>
      )
    }

    if (userData.data.author.github) {
      cardActions.push(
        <Tooltip title='See GitHub profile' color='blue'>
          <a style={{fontSize: '2em'}} href={`https://github.com/${userData.data.author.github}`}><GithubFilled /></a>
        </Tooltip>
      )
    }


    const headMeta = {
      title: properties.title,
      author: userData.data.author.displayName,
      description: properties.excerpt,
      cover: properties.cover,
      url: `https://thepost.io/${username}/${postid}`,
    }

    return (
      <MainLayout headMeta={headMeta}>
        <div>
          <Divider>
            <Breadcrumb
              className={styles.breadcrumbs}
            >
              <Breadcrumb.Item>
                <Link href='/'><a>The Post</a></Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link href={`/${username}`}><a>{userData.data.author.displayName}</a></Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {properties.title}
              </Breadcrumb.Item>
            </Breadcrumb>
          </Divider>
            {headerCard}

            <div
              className={styles.articlecontent}
              ref={this._htmlDivRef} dangerouslySetInnerHTML={{ __html: articleData.data.html }}
            />

            
            <div
              style={{textAlign: 'center'}}
            >
              <a href={UrlBuilder.getEditArticleLink(username, postid, provider)}>
                <Button type="primary">Edit this article</Button>
              </a>
            </div>

            <Card
              className={styles.authorcard}
              actions={cardActions}
            >
              <Meta
                avatar={<Avatar size={50} src={userData.data.author.picture} />}
                title={userData.data.author.displayName}
                description={userData.data.author.biography}
              />
            </Card>

        </div>
      </MainLayout>
    )
  }
}


// export default Post
export default withRouter(Post)




export async function getServerSideProps(context) {
  // TODO: create a query param to specify other data provider than GitHub
  const provider = 'github'
  const urlQuery = context.query
  // console.log(urlQuery)
  let userData = await getAuthorData(urlQuery.username, provider)
  let articleData = await getPostData(urlQuery.username, urlQuery.postid, provider)

  if (!userData.error && !articleData.error) {
    // check if not done by a robot
    incrementVisit(urlQuery.username, urlQuery.postid)
  }
  


  return {
    props: {
      provider,
      userData,
      articleData,
    },
  }
}