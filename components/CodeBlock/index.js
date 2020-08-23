/*
  Loading a css module. The internal class will have unique names to ensure scoping.
*/
import styles from './codeblock.module.css'

export default function CodeBlock() {
  return (
    <pre
      className={styles.container}
    >
      This is some code
    </pre>
  )
}