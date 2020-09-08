
import Link from 'next/link'
import { Steps, Button, Row, Col } from 'antd'
import { GithubOutlined, FormOutlined, ReadOutlined } from '@ant-design/icons'
import MainLayout from '../components/MainLayout'
import Styles from './home.module.css'
const { Step } = Steps




export default function Home() {
  
  return (
    <MainLayout>
      <div
        style={{
          marginTop: 100,
        }}
      >
          <Steps
            style={{
              marginBottom: 80,
            }}
            // direction="vertical" 
          >
      
            <Step
              status="finish"
              title="Write"
              icon={<FormOutlined style={{ color: '#40a9fe'}} />} 
              description="With Mardown, using your favorite text editor."  
            />

            <Step
              status="finish"
              title="Push"
              icon={<GithubOutlined style={{ color: '#40a9fe'}} />} 
              description="On GitHub, in a 'thepostio-content' repository."  
            />

            <Step
              status="finish"
              title="Read"
              icon={<ReadOutlined style={{ color: '#40a9fe'}} />} 
              description="On The Post, with a friendly URL to share."  
            />
          </Steps>
          
          <Row>
            <Col span={24} justify="center" style={{textAlign: 'center'}}>
              <Link href='/thepostio/getting-started'><a>
                <Button type="primary" style={{textAlign: 'center'}}>Learn more</Button>
              </a></Link>
            </Col>
          </Row>
          
      </div>
    </MainLayout>
  )
}
