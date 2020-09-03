import { useRouter } from 'next/router'
import { Breadcrumb, Tooltip, Button, Divider, Col, Row } from 'antd'
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
            {userData.data.author.displayName}
            </Breadcrumb.Item>
          </Breadcrumb>


        <Row>
          <Col xs={5}  sm={6}  md={7}  lg={8} xl={9}>
          </Col>

          <Col xs={14}  sm={12}  md={10}  lg={8} xl={6}>
            <img
              className={styles.profilepicture}
              src={userData.data.author.picture}
            />
          </Col>

          <Col xs={5}  sm={6}  md={7}  lg={8} xl={9}>
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
              style={{
                fontSize: '2em'
              }}
            >
              {userData.data.author.displayName}
            </h1>

            <p
              style={{
                color: '#9c9c9c',
              }}
            >
            {userData.data.author.biography}
            </p>
          </Col>

          <Col xs={2}  sm={2}  md={5}  lg={6} xl={6}>
          </Col>
        </Row>

 
        <p>
          <a href={'https://twitter.com/' + userData.data.author.twitter}>twitter</a> - <a href={userData.data.author.website}>website</a>
        </p>

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