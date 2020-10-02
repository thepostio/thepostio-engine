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


    const niceDate = postMetadata.date
    ? (<div className={styles.datetitle}>{format(parseISO(postMetadata.date), 'LLLL d, yyyy')}</div>)
    : ' '

    return (
      
      <Card
      className={styles.card}
      hoverable
      bordered={false}
      extra={<span style={{color: '#8a8a8a'}}>{postMetadata.subtitle}</span>}

      title={niceDate}
      cover={
        <Link href={`/${postMetadata.username}/${postMetadata.postid}`}><a>
        <div
          style={{
            background: `url(${postMetadata.cover || 'https://thepost.io/images/mosaic.png'}) no-repeat center center`,
            backgroundSize: 'cover',
            height: 250,
          }}
        >
        </div>
        </a></Link>
      }
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