import { useRouter } from 'next/router'
import MainLayout from '../components/MainLayout'
import { getAuthorData } from '../server/data'
import Link from 'next/link'

const User = ({userData}) => {
  const router = useRouter()
  const { username } = router.query
  

  if (userData.error) {
    return <p>ERROR {userData.error}</p>  
  }

  return (
    <MainLayout>
      <div>
        <h1>
          {userData.data.author.displayName}
        </h1>
        <img src={userData.data.author.picture}/>
        <p>
          {userData.data.author.biography}
        </p>
        <p>
          <a href={'https://twitter.com/' + userData.data.author.twitter}>twitter</a> - <a href={userData.data.author.website}>website</a>
        </p>

        <ul>
          {userData.data.articles.map((slug) => <li key={slug}><Link href={`/${username}/${slug}`}><a>{slug}</a></Link></li>)}
        </ul>
      </div>
    </MainLayout>
  )
}

export default User


export async function getServerSideProps(context) {
  // TODO: create a query param to specify other data provider than GitHub
  const urlQuery = context.query
  let userData = await getAuthorData(urlQuery.username)


  return {
    props: {
      userData
    },
  }
}