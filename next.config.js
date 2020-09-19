require('dotenv').config()

module.exports = {
  env: {
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY:process.env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME_DEV:process.env.S3_BUCKET_NAME_DEV,
    S3_BUCKET_NAME_PROD: process.env.S3_BUCKET_NAME_PROD,
    S3_REGION: process.env.S3_REGION,
  },
};