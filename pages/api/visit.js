import jwt from 'jsonwebtoken'
import UserAgent from 'express-useragent'
import { incrementVisit } from '../../server/metrics'


/**
 * Here we are counting the visit to a specific post.
 * The provider + author username + postId are included in the token (JWT)
 * so the request has basically no (need for a) body
 */
export default async (req, res) => {
  let visitToken = null

  let retValue = {
    status: null,
    error: null
  }

  try {
    const userAgentStr = req.headers['user-agent']
    const userAgentData = UserAgent.parse(userAgentStr)

    if (userAgentData.isBot) {
      throw new Error('You are a bot, your visit does not count.')
    }

    visitToken = req.headers.authorization.split(' ').pop()
    const decoded = jwt.verify(visitToken, process.env.JWT_SECRET)
    console.log(decoded)

    if (decoded.purpose !== 'visit') {
      throw new Error('This token is not a visitToken.')
    }

    await incrementVisit(decoded.username, decoded.postId, decoded.provider)
    retValue.status = 'OK'
  } catch(err) {
    retValue.error = err.message
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(retValue))
}