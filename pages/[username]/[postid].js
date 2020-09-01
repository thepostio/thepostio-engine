// import { useRouter } from 'next/router'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { parseISO, format } from 'date-fns'
import hljs from 'highlight.js'
import { Breadcrumb, Card, Space, Avatar } from 'antd'
import { FrownOutlined, TwitterCircleFilled, GithubFilled, PlusCircleFilled } from '@ant-design/icons'
import { getAuthorData, getPostData } from '../../server/data'
import { incrementVisit, getRanking } from '../../server/metrics'
import MainLayout from '../../components/MainLayout'
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
    const userData = this.props.userData
    const articleData = this.props.articleData


    if (userData.error || articleData.error) {
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
            <div
              style={{
                fontSize: '4em',
              }}
            >
              404
            </div>
            <div style={{
                fontSize: '1.5em',
              }}
            >
              Article not found
            </div>
          </div>
        </MainLayout>
      )
    }



    // const router = useRouter()
    const router = this.props.router
    const { username, postid } = router.query
    const properties = articleData.data.properties
    const date = parseISO(properties.date)
    const niceDate = format(date, 'LLLL d, yyyy')

    const headerCard = (
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

        <div
          className={styles.headercarddarkgb}
        >

        </div>
        <div
        className={styles.headercardbgpicture}
          style={{
            background: `url(${properties.cover}) no-repeat center center`,
          }}
        >

        </div>
      </div>
    )

    return (
      <MainLayout>
        <div>

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


          {headerCard}

          {
            articleData.error
            ? articleData.error
            : <div ref={this._htmlDivRef} dangerouslySetInnerHTML={{ __html: articleData.data.html }} />
          }


          <Card
            className={styles.authorcard}
            actions={[
              
              <Link href={`/${username}`}><a style={{fontSize: '2em'}}><PlusCircleFilled /></a></Link>,
              <a style={{fontSize: '2em'}} href={`https://twitter.com/${userData.data.author.twitter}`}><TwitterCircleFilled /></a>,
              <a style={{fontSize: '2em'}} href={`https://github.com/${userData.data.author.github}`}><GithubFilled /></a>,
            ]}
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
  const urlQuery = context.query
  // console.log(urlQuery)
  let userData = await getAuthorData(urlQuery.username)
  let articleData = await getPostData(urlQuery.username, urlQuery.postid)

  if (!userData.error && !articleData.error) {
    // check if not done by a robot
    incrementVisit(urlQuery.username, urlQuery.postid)
    console.log(getRanking())
  }
  


  return {
    props: {
      userData,
      articleData,
    },
  }
}