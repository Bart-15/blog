import Head from 'next/head'
import Login from '../pages/login'
import styles from '../styles/Home.module.css'



export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bart- Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Login />
       </main>
    </div>
  )
}
