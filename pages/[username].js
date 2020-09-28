import { withRouter } from 'next/router'
import { Breadcrumb, Tooltip, Button, Divider, Col, Row, Space, notification } from 'antd'
import {
  TwitterCircleFilled,
  GithubFilled,
  GlobalOutlined,
  FrownOutlined,
  ReadOutlined
} from '@ant-design/icons'


import Link from 'next/link'
import MainLayout from '../components/MainLayout'
import { getAuthorData } from '../server/data'
import PostCard from '../components/PostCard'
import styles from './username.module.css'

// how many articles on each load
const ARTICLE_PAGE_SIZE = 5

class User extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      articleMetas: []
    }
  }


  componentDidMount() {
    this.loadNextArticles()
  }

  // load the next batch of articles
  loadNextArticles = async () => {
    const articleMetas = this.state.articleMetas
    const postIds = this.props.userData.data.articles
    const provider = this.props.provider
    const router = this.props.router
    const { username } = router.query

    const postIdsToLoad = postIds.slice(articleMetas.length, articleMetas.length + ARTICLE_PAGE_SIZE)

    const promises = postIdsToLoad.map((postId) => fetch(`/api/articlemeta?username=${username}&postid=${postId}&provider=${provider}`))

    const res = await Promise.all(promises)
    const newArticleMetasCandidates = await Promise.all(res.map((r) => r.json()))
    const newArticleMetas = newArticleMetasCandidates.filter((meta) => !meta.error)

    const erroredArticles = newArticleMetasCandidates.filter((meta) => meta.error)
    
    if (erroredArticles.length) {
      notification.open({
        message: 'Loading Error',
        description: 'Some articles could not be loaded. If you are the author, make sure your "config.yaml" post listing contains only existing articles.',
        placement: 'bottomRight',
      })
    }

    this.setState({
      articleMetas: articleMetas.concat(newArticleMetas)
    })
  }


  render() {
    const router = this.props.router
    const { username } = router.query
    const userData = this.props.userData
    const articleMetas = this.state.articleMetas //this.props.articleMetas
    const provider = this.props.provider
    const postIds = this.props.userData.data.articles

    if (userData.error) {
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
                fontSize: '1em',
                marginTop: '2em',
              }}
            >
              {userData.error}
            </div>
          </div>
        </MainLayout>
      )
    }
  
    const userLinks = []
  
    if (userData.data.author.website) {
      userLinks.push(
        <Tooltip title='Visit website' color='blue' key='website'>
          <a style={{fontSize: '2em'}} href={userData.data.author.website}><GlobalOutlined /></a>
        </Tooltip>
      )
    }
  
    if (userData.data.author.twitter) {
      userLinks.push(
        <Tooltip title='See Twitter profile' color='blue' key='twitter'>
          <a style={{fontSize: '2em'}} href={`https://twitter.com/${userData.data.author.twitter}`}><TwitterCircleFilled /></a>
        </Tooltip>
      )
    }
  
    if (userData.data.author.github) {
      userLinks.push(
        <Tooltip title='See GitHub profile' color='blue' key='github'>
          <a style={{fontSize: '2em'}} href={`https://github.com/${userData.data.author.github}`}><GithubFilled /></a>
        </Tooltip>
      )
    }
  
    const headMeta = {
      title: `The Post — ${userData.data.author.displayName}`,
      author: userData.data.author.displayName,
      description: `${articleMetas.length} article${articleMetas.length > 1 ? 's' : ''} by ${userData.data.author.displayName} on The Post`,
      cover: userData.data.author.picture,
      url: `https://thepost.io/${username}`,
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
            {userData.data.author.displayName}
            </Breadcrumb.Item>
          </Breadcrumb>
  
          </Divider>
  
          <Row
            style={{
              marginTop: '1em',
            }}
          >
            <Col xs={5}  sm={7}  md={7}  lg={8} xl={9}>
            </Col>
  
            <Col xs={14}  sm={10}  md={10}  lg={8} xl={6}>
              <img
                className={styles.profilepicture}
                src={userData.data.author.picture}
              />
            </Col>
  
            <Col xs={5}  sm={7}  md={7}  lg={8} xl={9}>
            </Col>
          </Row>
  
  
          <Row
            style={{
              textAlign: 'center',
              marginTop: '1em'
            }}
          >
            <Col xs={2}  sm={2}  md={5}  lg={6} xl={6}>
            </Col>
  
            <Col xs={20}  sm={20}  md={14}  lg={12} xl={12}>
              <h1
                className={styles.username}
              >
                {userData.data.author.displayName}
              </h1>
  
              {
                userLinks.length 
                ? 
                (
                  <Space
                    className={styles.sociallinks}
                  >
                    {userLinks}
                  </Space>
                )
                : null
              }
  
              <p
                className={styles.biography}
              >
              {userData.data.author.biography}
              </p>
            </Col>
  
            <Col xs={2}  sm={2}  md={5}  lg={6} xl={6}>
            </Col>
          </Row>
  
          <div>
            <Space direction="vertical" size={75} style={{width: '100%', marginTop: 50}}>
              {articleMetas.map((meta, i) => <PostCard key={i} postMetadata={meta}/>) }
            </Space>
          </div>

          {
            articleMetas.length < postIds.length
            ? 
            <div className={styles.loadmorecontainer}>
              <Button type="primary" onClick={this.loadNextArticles}>Load more</Button>
            </div>
            : null
          }
  
        </div>
      </MainLayout>
    )
  }


}

export default withRouter(User)


export async function getServerSideProps(context) {
  // TODO: create a query param to specify other data provider than GitHub
  const urlQuery = context.query
  const provider = 'github'

  let userData = await getAuthorData(urlQuery.username, provider)
  
  return {
    props: {
      userData,
      provider,
    },
  }
}