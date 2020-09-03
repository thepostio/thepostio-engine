import { useRouter } from 'next/router'
import { Breadcrumb, Tooltip, Button, Divider, Col, Row, Space } from 'antd'
import {
  TwitterCircleFilled,
  GithubFilled,
  GlobalOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import MainLayout from '../components/MainLayout'
import { getAuthorData } from '../server/data'
import styles from './username.module.css'


const User = ({userData}) => {
  const router = useRouter()
  const { username } = router.query
  

  if (userData.error) {
    return <p>ERROR {userData.error}</p>  
  }

  const userLinks = []

  if (userData.data.author.website) {
    userLinks.push(
      <Tooltip title='Visit website' color='blue'>
        <a style={{fontSize: '2em'}} href={userData.data.author.website}><GlobalOutlined /></a>
      </Tooltip>
    )
  }

  if (userData.data.author.twitter) {
    userLinks.push(
      <Tooltip title='See Twitter profile' color='blue'>
        <a style={{fontSize: '2em'}} href={`https://twitter.com/${userData.data.author.twitter}`}><TwitterCircleFilled /></a>
      </Tooltip>
    )
  }

  if (userData.data.author.github) {
    userLinks.push(
      <Tooltip title='See GitHub profile' color='blue'>
        <a style={{fontSize: '2em'}} href={`https://github.com/${userData.data.author.github}`}><GithubFilled /></a>
      </Tooltip>
    )
  }

  return (
    <MainLayout>
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



        <ul>
          {userData.data.articles.map((slug) => <li key={slug}><Link href={`/${username}/${slug}`}><a>{slug}</a></Link></li>)}
        </ul>
      </div>
    </MainLayout>
  )
}

export default User


export async function getServerSideProps(context) {
  // TODO: create a query param to specify other data provider than GitHub
  const urlQuery = context.query
  let userData = await getAuthorData(urlQuery.username)


  return {
    props: {
      userData
    },
  }
}