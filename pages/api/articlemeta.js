import { getPostMetadata } from '../../server/data'
/**
 * Here we are counting the visit to a specific post.
 * The provider + author username + postId are included in the token (JWT)
 * so the request has basically no (need for a) body
 */
export default async (req, res) => {
  const query = req.query

  let retValue = {
    data: null,
    error: null
  }

  try {
    let username = null
    let postId = null
    let provider = 'github'

    if ('username' in query) {
      username = query.username
    } else {
      throw new Error('The username must be provided')
    }

    if ('postid' in query) {
      postId = query.postid
    } else {
      throw new Error('The postid must be provided')
    }

    if ('provider' in query) {
      provider = query.provider
    }

    let metadata = await getPostMetadata(username, postId, provider)

    if (metadata.error) {
      throw new Error(metadata.error)
    } else {
      retValue.data = metadata.data
    }

  } catch (err) {
    retValue.error = err.message
  }
  
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(retValue))
}