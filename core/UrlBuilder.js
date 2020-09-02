export default class UrlBuilder {
  static getEditArticleLink(username, postId, provider = 'github') {
    if (provider === 'github') {
      return `https://github.com/${username}/thepostio-content/edit/master/articles/${postId}/index.md`
    }
  }

  
}