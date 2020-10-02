import Link from 'next/link'
import { Button, Row, Col, Timeline } from 'antd'
import { GithubOutlined, FormOutlined, ReadOutlined } from '@ant-design/icons'
import MainLayout from '../components/MainLayout'
import Styles from './home.module.css'



export default function Home() {
  
  return (
    <MainLayout>
      <div
        className={Styles.catchphraseheader}
      >
        {'Publish & Keep Ownership.'}
      </div>
      <div
        className={Styles.timelineContainer}
      >
          <Timeline mode="alternate">

            <Timeline.Item
              dot={<FormOutlined style={{ color: '#40a9fe', fontSize: '2em'}} />}
              className={Styles.timelineElement}
            >
              <div className={Styles.timelineElement}>
                <h1>Write</h1>
                <p>
                  With Markdown, using your favorite text editor.
                </p>
              </div>
            </Timeline.Item>


            <Timeline.Item
              dot={<GithubOutlined style={{ color: '#40a9fe', fontSize: '2em'}} />}
            >
              <div className={Styles.timelineElement}>
                <h1>Push</h1>
                <p>
                  On GitHub, in a <code>thepostio-content</code> repository.
                </p>
              </div>
            </Timeline.Item>


            <Timeline.Item
              dot={<ReadOutlined style={{ color: '#40a9fe', fontSize: '2em'}} />}
            >
              <div className={Styles.timelineElement}>
                <h1>Read</h1>
                <p>
                  On The Post, with a friendly URL to share.
                </p>
              </div>
            </Timeline.Item>

          </Timeline>
          
          <Row style={{marginTop: 10}}>
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
