import fetch from 'node-fetch'
import yaml from 'js-yaml'

export async function getAuthorData(username, provider = 'github') {
  let url = `https://raw.githubusercontent.com/${username}/thepostio-content/master/config.yaml`
  // TODO: here place the if/switch for other providers' URL making
  
  let userData = {
    data: null,
    error: null,
  }

  try {
    const userRes = await fetch(url)

    // for some reasons, a 404 does not throw
    if (!userRes.ok) {
      throw new Error(`${userRes.status} ${userRes.statusText}`)
    }

    const dataText = await userRes.text()
    userData.data = yaml.safeLoad(dataText)
  } catch(err) {
    userData.error = err.message
  }

  return userData
}



export async function getPostData(username, postid) {

}