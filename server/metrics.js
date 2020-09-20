import { format } from 'date-fns'
// import dotenv from 'dotenv'
import BucketLayer from './BucketLayer'
// dotenv.config()


/**
 * Put into a S3 bucket the record about this visit
 */
export async function incrementVisit(username, postId, provider = 'github') {

  // prepare to push data to a S3 bucket
  const settings = { 
    endpoint: process.env.S3_ENDPOINT,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    bucket: process.env.PRODUCTION ? process.env.S3_BUCKET_NAME_PROD : process.env.S3_BUCKET_NAME_DEV,
    region: process.env.S3_REGION,
  }

  console.log('Environment:', process.env.PRODUCTION ? 'PROD' : 'DEV')
  console.log('S3 settings:')
  console.log(settings)

  // console.log('>>>>>>>>>>>>> process.env >>>>>>>>>>>>')
  // console.log(process.env)
  // console.log('--------------------------------------')

  const bl = new BucketLayer(settings)
  const now = new Date()
  const strDate = format(now, 'yyyy-MM-dd')

  // 1. Create a record to state that this triple [provider + username + postId]
  // was visited on this day. This record already exists if this article was already
  // visited during the same day but it's cheaper to overwrite no matter what than 
  // to check first.
  const visitedPostKey = `visits/visitedPosts/${strDate}/${provider}/${username}/${postId}`
  const res1 = await bl.set(visitedPostKey, '1')
  console.log('key: ', visitedPostKey)
  console.log('res: ', res1)

  // 2. Create a record for this triple for this specific visit. The last element
  // of the key is the timestamp. Since the timestamp is in ms, we do not expect doublons
  // (and even though they occure, this would not be critical)
  const uniquePostVisitsKey = `visits/uniquePostVisits/${strDate}/${provider}/${username}/${postId}/${+now}`
  const res2 = await bl.set(uniquePostVisitsKey, '1')
  console.log(res2)
}

