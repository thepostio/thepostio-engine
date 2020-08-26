import { useRouter } from 'next/router'
import Link from 'next/link'
import { parseISO, format } from 'date-fns'
import { getAuthorData, getPostData } from '../../server/data'
import { incrementVisit, getRanking } from '../../server/metrics'


const Post = ({userData, articleData}) => {
  const router = useRouter()
  const { username, postid } = router.query
  const properties = articleData.data.properties
  const date = parseISO(properties.date)
  const niceDate = format(date, 'LLLL d, yyyy')

  

  return (
    <div>
      <p><Link href={`/${username}`}><a>← back</a></Link></p>
      <p>Username: {username}</p>
      <p>PostId: {postid}</p>
      <p>{niceDate}</p>
      <p>{properties.title}</p>
      
      {
        properties.cover
        ? <img src={properties.cover}/>
        : null
      }

      {
        articleData.error
        ? articleData.error
        : <div dangerouslySetInnerHTML={{ __html: articleData.data.html }} />
      }


    </div>
  )
}

export default Post




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