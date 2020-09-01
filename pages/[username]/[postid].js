// import { useRouter } from 'next/router'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { parseISO, format } from 'date-fns'
import hljs from 'highlight.js'
import { getAuthorData, getPostData } from '../../server/data'
import { incrementVisit, getRanking } from '../../server/metrics'
import MainLayout from '../../components/MainLayout'
import styles from './styles.module.css'


// const Post = ({userData, articleData}) => {
//   const router = useRouter()
//   const { username, postid } = router.query
//   const properties = articleData.data.properties
//   const date = parseISO(properties.date)
//   const niceDate = format(date, 'LLLL d, yyyy')

  

//   return (
//     <div>
//       <p><Link href={`/${username}`}><a>← back</a></Link></p>
//       <p>Username: {username}</p>
//       <p>PostId: {postid}</p>
//       <p>{niceDate}</p>
//       <p>{properties.title}</p>
      
//       {
//         properties.cover
//         ? <img src={properties.cover}/>
//         : null
//       }

//       {
//         articleData.error
//         ? articleData.error
//         : <div dangerouslySetInnerHTML={{ __html: articleData.data.html }} />
//       }


//     </div>
//   )
// }

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this._htmlDivRef = React.createRef()
  }

  highlight = () => {
    if (!this.state.editionMode && this._htmlDivRef.current) {
      // console.log('this._htmlDivRef', this._htmlDivRef)
        const nodes = this._htmlDivRef.current.querySelectorAll('pre')
        nodes.forEach((node) => {
          hljs.highlightBlock(node)
        })
    }
  }


  componentDidMount() {
    console.log('COMPONENET DID MOUNT');
    this.highlight()
  }

  render() {
    const userData = this.props.userData
    const articleData = this.props.articleData
    // const router = useRouter()
    const router = this.props.router
    const { username, postid } = router.query
    const properties = articleData.data.properties
    const date = parseISO(properties.date)
    const niceDate = format(date, 'LLLL d, yyyy')

    const headerCard = (
      <div
        style={{
          height: 350,
          position: 'relative',
          width: '120%',
          maxWidth: '100vw',
          marginLeft: '-10%',
        }}
      >

        <div
          className={styles.titlewrapper}
        >
          <div className={styles.titleuser}>{userData.data.author.displayName}</div>
          <h1 className={styles.title}>{properties.title}</h1>
          <div className={styles.nicedate}>{niceDate}</div>
        </div>

        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#00000044',
            position: 'absolute',
            zIndex: 2,
          }}
        >

        </div>
        <div
          style={{
            background: `url(${properties.cover}) no-repeat center center`,
            backgroundSize: 'cover',
            height: '100%',
            zIndex: 1,
          }}
        >

        </div>
      </div>
    )

    return (
      <MainLayout>
        <div>
          <p>
            <Link href={`/${username}`}><a>← back to {userData.data.author.displayName}'s articles</a></Link>
          </p>
          <p>Username: {username}</p>
          <p>PostId: {postid}</p>
          
          
          {headerCard}
          {/* {
            properties.cover
            ? <img src={properties.cover} className={styles.cover}/>
            : null
          } */}

          {
            articleData.error
            ? articleData.error
            : <div ref={this._htmlDivRef} dangerouslySetInnerHTML={{ __html: articleData.data.html }} />
          }


        </div>
      </MainLayout>
    )
  }
}


// export default Post
export default withRouter(Post)




export async function getServerSideProps(context) {
  // TODO: create a query param to specify other data provider than GitHub
  const urlQuery = context.query
  // console.log(urlQuery)
  let userData = await getAuthorData(urlQuery.username)
  let articleData = await getPostData(urlQuery.username, urlQuery.postid)

  if (!userData.error && !articleData.error) {
    // check if not done by a robot
    incrementVisit(urlQuery.username, urlQuery.postid)
    console.log(getRanking())
  }
  


  return {
    props: {
      userData,
      articleData,
    },
  }
}