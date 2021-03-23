import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/MessagesPage.module.css';
import Footer from '../../components/Footer';
const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});
const Convo = dynamic(() => import('../../components/Convo'), {
  ssr: false
});

export default function MessagesPage() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru - Messages</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <div className={styles.container}>
        <h1 className={styles.title}>Messages</h1>
        <Convo />
      </div>

      <Footer />
    </div>
  )
}
