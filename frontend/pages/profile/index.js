import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/ProfilePage.module.css';
import Footer from '../../components/Footer';
import Profile from '../../components/Profile';
const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});

export default function ProfilePage() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru - Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.friendlist}>
          <Profile />
        </div>
      </div>

      <Footer />
    </div>
  )
}