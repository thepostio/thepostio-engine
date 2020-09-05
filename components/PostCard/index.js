import { Card } from 'antd'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import styles from './styles.module.css'
const { Meta } = Card


export default class PostCard extends React.Component {
  
  render() {
    const postMetadata = this.props.postMetadata.data

    if (this.props.postMetadata.error) {
      return (
        <div>
          ERROR, article not available.
        </div>
      )
    }

    return (
      
      <Card
      className={styles.card}
      hoverable
      bordered={false}
      // style={{
      //   width: '100%',
      //   boxShadow: '0px 0px 28px -13px rgb(0 0 0 / 30%)'
      // }}
      // cover={<img alt="example" src={postMetadata.cover} />}

      title={<div className={styles.datetitle}>{format(parseISO(postMetadata.date), 'LLLL d, yyyy')}</div>}
      cover={
        <Link href={`/${postMetadata.username}/${postMetadata.postid}`}><a>
        <div
          style={{
            background: `url(${postMetadata.cover}) no-repeat center center`,
            backgroundSize: 'cover',
            height: 250,
          }}
        >
        </div>
        </a></Link>
      }


      // extra={<Link href={`/${postMetadata.username}/${postMetadata.postid}`}><a>Read the article </a></Link>}
    >
      <Meta
        title={
          <Link href={`/${postMetadata.username}/${postMetadata.postid}`}><a style={{color: 'inherit', textDecoration: 'none'}}>
            {postMetadata.title}
          </a></Link>
        }
        description={postMetadata.excerpt}
      />
    </Card>
    
    )
  }
}