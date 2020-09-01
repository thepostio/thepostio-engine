import Head from 'next/head'
// import Layout, { siteTitle } from '../components/layout'


// import { getSortedPostsData } from '../lib/fetchPost'

export default function Home() {
  return (
    <div>
      <Head>

      </Head>
      hello
    </div>
  )
}


// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()

//   console.log(allPostsData)

//   return {
//     props: {
//       allPostsData
//     }
//   }
// }



// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }