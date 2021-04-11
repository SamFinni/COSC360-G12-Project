import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/FriendsPage.module.css';
import Footer from '../../components/Footer';
const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});
const FriendList = dynamic(() => import('../../components/FriendList'), {
  ssr: false
});
const RequestList = dynamic(() => import('../../components/RequestList'), {
  ssr: false
});

export default function FriendsPage() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru - Friends</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <div className={styles.container}>
        <h1 className={styles.title}>Friends</h1>
        <FriendList />
        <RequestList />
      </div>

      <Footer />
    </div>
  )
}