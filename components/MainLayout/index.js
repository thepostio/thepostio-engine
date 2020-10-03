import { Layout, Row, Col } from 'antd'
import styles from './mainlayout.module.css'
import Link from 'next/link'
import Head from 'next/head'
import TopLeftMenu from '../TopLeftMenu'
const { Header, Footer, Content } = Layout


class MainLayout extends React.Component {

  render() {
    const headMeta = {...this.props.headMeta}

    const title = headMeta.title ? headMeta.title : 'The Post'
    const description = headMeta.description ? headMeta.description : 'Publish things, own your content.'
    const url = headMeta.url ? headMeta.url : 'https://thepost.io'
    const cover = headMeta.cover ? headMeta.cover : 'https://thepost.io/images/mosaic.jpg'
    const author = headMeta.author ? headMeta.author : 'The Post'

    return (
      <Layout
        style={{
            position: 'relative',
            minHeight: '100vh',
        }}
      >
        <Head>
          <title>{title}</title>
          <link rel="shortcut icon" href="/favicon.png" />

          <meta name="description" content={description}/>
          <meta name="author" content={author}/>

          <meta property="og:title" content={title} key="title_OG" />
          <meta property="og:url" content={url} key="url_OG"/>
          <meta property="og:image" content={cover} key="image_OG"/>
          <meta property="og:description" content={description} key="description_OG"/>
          <meta property="og:site_name" content="The Post" key="sitename_OG"/>
          <meta property="og:type" content="article" key="type_OG"/>

          <meta name="twitter:title" content={title} key="title_TW"/>
          <meta name="twitter:description" content={description} key="description_TW"/>
          <meta name="twitter:image" content={cover} key="image_TW"/>
          <meta name="twitter:card" content="summary_large_image" key="card_TW"/>
          <meta name="twitter:site" content="@jonathanlurie" key="site_TW"/>

          
        </Head>

        <Header
          className={styles.header}
        >
          <Row
          >
            <Col
              span={2}
            >
              <TopLeftMenu/>
            </Col>
            <Col
              span={20}
              justify='center'
            >
              <div
                style={{
                  width: 'fit-content',
                  margin: 'auto',
                }}
              >
              <Link href='/'><a>
                <img
                  className={styles.logo}
                  width={130}
                  height={130}
                  src='/images/logo.png'
                  alt='The Post logo'
                />
              </a></Link>
              </div>
            </Col>

            <Col
              span={2}
            >
            </Col>
          </Row>
        </Header>
        
        <Row
          style={{
            marginBottom: 200,
          }}
        >
          <Col xs={2}  sm={2}  md={4}  lg={4} xl={6}>
          </Col>

          <Col xs={20} sm={20} md={16} lg={16} xl={12}>
            <Content>
              {this.props.children}
            </Content>
          </Col>

          <Col xs={2}  sm={2}  md={4}  lg={4} xl={6}>
          </Col>
        </Row>
        
        <Footer
          className={styles.footer}
        >
          <Row>
            <Col xs={2}  sm={2}  md={4}  lg={4} xl={6}>
            </Col>

            <Col xs={20} sm={20} md={16} lg={16} xl={12}>
              <Row>
                <Col span={6}>
                  <img src='/images/logo_dark.png' className={styles.footerlogo}/>
                </Col>

                <Col span={18} style={{textAlign: 'right'}}>
                  <p>
                    Created by <a href='https://twitter.com/jonathanlurie'>@jonathanlurie</a> <br/>
                    Fork it on <a href='https://github.com/thepostio/thepostio-engine'>GitHub</a>.
                  </p>
                </Col>
                
              </Row>
            </Col>
            

            <Col xs={2}  sm={2}  md={4}  lg={4} xl={6}>
            </Col>
          </Row>
        </Footer>
      </Layout>
    )
  }
}

export default MainLayout