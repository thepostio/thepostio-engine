/*
  This _app.js is a global JS 'components' to do global things.
  For example:
    - global css
    - globla states
*/

import '../styles/global-style.css'



export default function App({ Component, pageProps }) {
  const someVar = 'hello'

  pageProps.thing = 'lala'

  return <Component {...pageProps} />
}