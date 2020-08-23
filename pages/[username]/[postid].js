import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { pid } = router.query
  console.log(router)

  return <p>the post foo of user bar...</p>
}

export default Post


export async function getServerSideProps(context) {
  console.log('>>>>>>>>>>>>>>>>>>>>> pages: userid/postid')
  console.log('context', context)
  console.log('<<<<<<<<<<<<<<<<<<<<<')
  return {
    props: {}, // will be passed to the page component as props
  }
}