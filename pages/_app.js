/*
  This _app.js is a global JS 'components' to do global things.
  For example:
    - global css
    - globla states
*/



import 'highlight.js/styles/github.css'
import 'antd/dist/antd.css'
import '../styles/global-style.css'
// highlight.js/styles/github.css'
import cookieNotification from '../core/cookieNotification'



export default function App({ Component, pageProps }) {
  cookieNotification()

  return <Component {...pageProps} />
}