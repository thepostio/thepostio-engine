const DateFns = require('date-fns')
const BucketLayer = require('./BucketLayer')
require('dotenv').config()


console.log('Environment:', process.env.PRODUCTION ? 'PROD' : 'DEV')

const settings = {
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  bucket: process.env.PRODUCTION ? S3_BUCKET_NAME_PROD : process.env.S3_BUCKET_NAME_DEV,
  region: process.env.S3_REGION,
}

const bl = new BucketLayer(settings)

async function getVisitedPosts(dateStr) {
  const visitedPostsKey = `visits/visitedPosts/${dateStr}/`
  const visitedPosts = await bl.list(visitedPostsKey)

  const visited = visitedPosts.map(k => {
    const splitted = k.trim().split('/')
    return {
      username: splitted[4],
      postId: splitted[5],
      provider: splitted[3],
    }
  })
  return visited
}


async function countUniqueVisits(dateStr, visitedPosts) {
  for (let i = 0; i < visitedPosts.length; i += 1) {
    const visitedPost = visitedPosts[i]
    const uniquePostVisitsKey = `visits/uniquePostVisits/${dateStr}/${visitedPost.provider}/${visitedPost.username}/${visitedPost.postId}/`
    const visitTimestampList = await bl.list(uniquePostVisitsKey)
    visitedPost.visits = visitTimestampList.length
  }
}


// this is for today
async function main() {
  const dateStr = DateFns.format(new Date(), 'yyyy-MM-dd')

  // get the list of unique posts that have been visited today
  const visitedPosts = await getVisitedPosts(dateStr)
  await countUniqueVisits(dateStr, visitedPosts)

  // then count how many visit for each
  visitedPosts.sort((a, b) => {
    return Math.sign(b.visits - a.visits)
  })

  // finally, push the report so that it's easy to consume by the API.
  const reportCompleteKey = `visits/reportsComplete/${dateStr}`
  await bl.set(reportCompleteKey, visitedPosts)

  console.log(visitedPosts)

  // we also push a lightweight version containing only the top 1000 posts
  // with the highest number of visitors
  const top1000Posts = visitedPosts.slice(0, 1000)
  const reportTop1000Key = `visits/reportsTop1000/${dateStr}`

  await bl.set(reportTop1000Key, top1000Posts)
}


main()