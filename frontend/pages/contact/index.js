import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/HomePage.module.css';
import Footer from '../../components/Footer';
const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <div className={styles.container}>
        <div className={styles.postlist}>
          <h2>Contact Us</h2>
          <p>Please send all questions, comments and feedback directly back to yourself. We don't read our emails.</p>
        </div>
      </div>

      <Footer />
    </div>
  )
}