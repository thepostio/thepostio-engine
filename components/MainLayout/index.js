import { Layout, Row, Col, Drawer, Space } from 'antd'
import { MenuOutlined, GithubOutlined } from '@ant-design/icons'
import styles from './mainlayout.module.css'
import Link from 'next/link'
const { Header, Footer, Sider, Content } = Layout


class MainLayout extends React.Component {

  render() {
    return (
      <Layout>

        <Header
          className={styles.header}
        >

          <Col
            size={24}
            justify='center'
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
          </Col>
        </Header>
        
        <Row>
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
                  <p>Created by <a href='https://twitter.com/jonathanlurie'>@jonathanlurie</a></p>
                  <p>Fork it on <a href='https://github.com/thepostio/thepostio-engine'><GithubOutlined/></a></p>
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