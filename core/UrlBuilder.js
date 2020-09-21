const MAIN_BRANCH = 'main'
const CONTENT_REPO_NAME = 'thepostio-content'





export default class UrlBuilder {
  static getEditArticle(username, postId, provider = 'github') {
    if (provider === 'github') {
      return `https://github.com/${username}/${CONTENT_REPO_NAME}/edit/${MAIN_BRANCH}/articles/${postId}/index.md`
    }

    return null
  }


  static getArticleFolder(username, postId, provider = 'github') {
    if (provider === 'github') {
      return `https://raw.githubusercontent.com/${username}/${CONTENT_REPO_NAME}/${MAIN_BRANCH}/articles/${postId}`
    }
    
    return null
  }


  static getArticle(username, postId, provider = 'github') {
    if (provider === 'github') {
      return `https://raw.githubusercontent.com/${username}/${CONTENT_REPO_NAME}/${MAIN_BRANCH}/articles/${postId}/index.md`
    }
    
    return null
  }


  static getUserConfig(username, provider = 'github') {
    if (provider === 'github') {
      return `https://raw.githubusercontent.com/${username}/${CONTENT_REPO_NAME}/${MAIN_BRANCH}/config.yaml`
    }
  
    return null
  }
}




