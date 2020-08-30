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



export default function App({ Component, pageProps }) {
  const someVar = 'hello'

  pageProps.thing = 'lala'

  return <Component {...pageProps} />
}