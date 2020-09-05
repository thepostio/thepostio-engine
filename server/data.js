import fetch from 'node-fetch'
import yaml from 'js-yaml'
import matter from 'gray-matter'
import Marked from 'marked'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import DateTools from '../core/DateTools'


export async function getAuthorData(username, provider = 'github') {
  let url = `https://raw.githubusercontent.com/${username}/thepostio-content/master/config.yaml`
  // TODO: here place the if/switch for other providers' URL making
  
  let userData = {
    data: null,
    error: null,
  }

  const userRes = await fetch(url)

  // for some reasons, a 404 does not throw
  if (!userRes.ok) {
    userData.error = `The user "${username}" does not seem to have any content to share on The Post.`
  }

  try {
    const dataText = await userRes.text()
    userData.data = yaml.safeLoad(dataText)
  } catch(err) {
    userData.error = err.message
  }

  return userData
}



export async function getPostData(username, postid, provider = 'github') {
  let folderUrl = `https://raw.githubusercontent.com/${username}/thepostio-content/master/articles/${postid}`
  let url = `${folderUrl}/index.md`

  let articleData = {
    data: null,
    error: null,
  }

  const articleRes = await fetch(url)

  if (!articleRes.ok) {
    articleData.error = 'This article does not exist'
  }

  try {
    // markdown business
    const textContent = await articleRes.text()
    const matterResult = matter(textContent)
    const makdownContent = markdownReplaceImageURL(matterResult.content.trim(), folderUrl)

    // Sometimes, yaml parser converts date strings into instances of Date class.
    // We don't want that because then serialization to client side is breaking.
    if ('date' in matterResult.data && matterResult.data.date instanceof Date) {
      matterResult.data.date = DateTools.getIso8601z({date: matterResult.data.date, onlyDate: true})
    } else if(!('date' in matterResult.data)) {
      matterResult.data.date = DateTools.getIso8601z({onlyDate: true})
    }

    // fix cover to relative path
    if ('cover' in matterResult.data && !matterResult.data.cover.startsWith('http')) {
      matterResult.data.cover = pathJoin ([folderUrl, matterResult.data.cover])
    } else if (!('cover' in matterResult.data)) {
      matterResult.data.cover = 'https://thepost.io/images/mosaic.png'
    }

    if (!('title' in matterResult.data)) {
      matterResult.data.title = 'Untitled'
    }

    if (!('excerpt' in matterResult.data)) {
      matterResult.data.excerpt = ''
    }

    articleData.data = {
      html: mdToHtml(makdownContent),
      properties: matterResult.data
    }

  } catch(err) {
    articleData.error = err.message
  }

  return articleData
}




export async function getPostMetadata(username, postid, provider = 'github') {
  let folderUrl = `https://raw.githubusercontent.com/${username}/thepostio-content/master/articles/${postid}`
  let url = `${folderUrl}/index.md`

  let articleData = {
    data: null,
    error: null,
  }

  const articleRes = await fetch(url)

  if (!articleRes.ok) {
    articleData.error = 'This article does not exist'
  }

  try {
    // markdown business
    const textContent = await articleRes.text()
    const matterResult = matter(textContent)

    // Sometimes, yaml parser converts date strings into instances of Date class.
    // We don't want that because then serialization to client side is breaking.
    if ('date' in matterResult.data && matterResult.data.date instanceof Date) {
      matterResult.data.date = DateTools.getIso8601z({date: matterResult.data.date, onlyDate: true})
    } else if(!('date' in matterResult.data)) {
      matterResult.data.date = DateTools.getIso8601z({onlyDate: true})
    }




    // fix cover to relative path
    if ('cover' in matterResult.data && !matterResult.data.cover.startsWith('http')) {
      matterResult.data.cover = pathJoin ([folderUrl, matterResult.data.cover])
    } else if (!('cover' in matterResult.data)) {
      matterResult.data.cover = 'https://thepost.io/images/mosaic.png'
    }

    if (!('title' in matterResult.data)) {
      matterResult.data.title = 'Untitled'
    }

    if (!('excerpt' in matterResult.data)) {
      matterResult.data.excerpt = ''
    }

    articleData.data = {
      ...matterResult.data,
      postid,
      username,
    }

  } catch(err) {
    articleData.error = err.message
  }

  return articleData
}





export function markdownReplaceImageURL (md, prefix) {
  let mdMod = md.replace(/!\[[a-zA-Z0-9 ]*\]\(\s*(\S*)\s*\)/gm, function(correspondance, p1){
    if (p1.startsWith('http')) {
      return correspondance
    } else {
      return correspondance.replace(p1, pathJoin([prefix, p1]))
    }
  })
  return mdMod
}


export function pathJoin (parts, separator = '/') {
  let cleanParts = []

  for (let i=0; i<parts.length; i++) {
    let part = parts[i]
    if (i > 0) {
      if (part[0] === separator) {
        part = part.substring(1)
      }
    }

    if (part[part.length - 1] === separator) {
      part = part.substring(0, part.length - 1)
    }

    cleanParts.push(part)
  }

  return cleanParts.join(separator)
}


function mdToHtml(md) {
  // return Marked(md)

  const { window } = new JSDOM('<!DOCTYPE html>')
  const domPurify = DOMPurify(window)
  return domPurify.sanitize(Marked(md), { ADD_TAGS: ["iframe"] })
}