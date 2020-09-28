import { format } from 'date-fns'
import mysql from 'mysql'
// import dotenv from 'dotenv'
import BucketLayer from './BucketLayer'
// dotenv.config()



/**
 * Put into a S3 bucket the record about this visit
 */
export async function incrementVisit(username, postId, provider = 'github') {

  const timestampMs = +(new Date)
  const timId = 'insert visit ' + timestampMs

  console.time(timId)
  const connection = mysql.createConnection({
    host     : process.env.MY_SQL_URL,
    user     : process.env.MY_SQL_USER,
    password : process.env.MY_SQL_PW,
    database : process.env.MY_SQL_DB,
  })

  connection.connect()

  const visit  = {
    timestamp: timestampMs,
    username: username,
    postid: postId,
    provider: provider
  }

  connection.query('INSERT INTO visits SET ?', visit, function (error, results, fields) {
    if (error) throw error;
  })

  connection.end()
  console.timeEnd(timId)
}
