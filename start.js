/*
  This alternative script to the regular `next start`
  provides the advantage to use a port mentionned in
  the envirinment variables or .env file
  */

require('dotenv').config()
const cli = require('next/dist/cli/next-start')

cli.nextStart(['-p', process.env.PORT || 3000])