const visitMetrics = {}
const SEPARATOR = '║'

export function incrementVisit(username, postId) {
  const id = `${username}${SEPARATOR}${postId}`

  if (!(id in visitMetrics)) {
    visitMetrics[id] = 0
  }
  visitMetrics[id] += 1
}


export function getRanking() {
  return Object.keys(visitMetrics).map((k) => {
    const usernamePostId = k.split(SEPARATOR)
    return {
      username: usernamePostId[0],
      postId: usernamePostId[1],
      visits: visitMetrics[k]
    }
  })
  .sort((a, b) => a.visits > b.visits ? 1 : -1)
}
