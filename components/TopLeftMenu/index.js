import { Space, Menu, Dropdown, Affix } from 'antd'
import {
  MenuOutlined,
  GithubOutlined,
  ThunderboltFilled,
  ExperimentOutlined,
  BugOutlined,
  EditOutlined,
  BookOutlined,
} from '@ant-design/icons'
import NewGithubIssueUrl from 'new-github-issue-url'
import Styles from './styles.module.css'

export default class TopLeftMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  render() {

    const repoOwner = 'thepostio'
    const repoName = 'thepostio-content'

    const bugUrl = NewGithubIssueUrl({
      user: repoOwner,
      repo: repoName,
      labels: ['bug'],
      body: '\n\n\n---\nI\'m a human. Please be nice.'
    })

    const feedbackUrl = NewGithubIssueUrl({
      user: repoOwner,
      repo: repoName,
      labels: ['feedback'],
      body: '\n\n\n---\nI\'m a human. Please be nice.'
    })

    const featureUrl = NewGithubIssueUrl({
      user: repoOwner,
      repo: repoName,
      labels: ['feature'],
      body: '\n\n\n---\nI\'m a human. Please be nice.'
    })



    const menu = (
      <Menu >
        
        <Menu.Item>
          <a href='/thepostio' className={Styles.link}>
            <Space>
              <BookOutlined className='blue-text'/> The Post's Blog
            </Space>
          </a>
        </Menu.Item>

        <Menu.Item>
          <a href='/thepostio/getting-started' className={Styles.link}>
            <Space>
              <EditOutlined className='blue-text'/> How to publish on The Post?
            </Space>
          </a>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href={feedbackUrl} className={Styles.link}>
            <Space>
              <ThunderboltFilled className='blue-text'/> Give constructive feedback
            </Space>
          </a>
        </Menu.Item>

        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href={featureUrl} className={Styles.link}>
          <Space>
            <ExperimentOutlined className='blue-text'/> Request a new feature
          </Space>
          </a>
        </Menu.Item>

        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href={bugUrl} className={Styles.link}>
          <Space>
            <BugOutlined className='blue-text'/> Found a bug?
          </Space>
          </a>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href='https://github.com/thepostio/thepostio-engine' className={Styles.link}>
          <Space>
            <GithubOutlined className='blue-text'/> See on GitHub
          </Space>
          </a>
        </Menu.Item>
      </Menu>
    )

    return (
      <Affix>
      <Dropdown overlay={menu} placement="bottomLeft">
        <MenuOutlined
          style={{
            color: '#40a9ff',
          }}
        />
      </Dropdown>
      </Affix>
    )
  }
}

