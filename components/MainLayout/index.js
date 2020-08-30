import { Layout, Row, Col, Drawer, Space } from 'antd'
import { MenuOutlined, GithubOutlined } from '@ant-design/icons'
const { Header, Footer, Sider, Content } = Layout

class MainLayout extends React.Component {

  render() {
    return (
      <Layout style={{background: '#fff'}}>

        <Header
          style={{
            background: 'white'
          }}
        >
          {/* <Space size="middle">
            <MenuOutlined onClick={this.showDrawer}/>
            <div onClick={this.backOnToday}>{logo}</div>
          </Space> */}

          <div>The Post</div>
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
        
        {/* <Footer>Footer</Footer> */}
      </Layout>
    )
  }
}

export default MainLayout