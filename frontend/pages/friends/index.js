import Head from 'next/head';
import axios from 'axios';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/FriendsPage.module.css';
import Footer from '../../components/Footer';
import Friend from '../../components/Friend';
const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});
import * as cfg from '../../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

export default function FriendsPage(props) {
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
        <div className={styles.friendlist}>
          {props.friends.map((friend, idx) => (
            <Friend key={`friend-${idx}`} data={friend} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const res = await axios.post(backend + '/friend/list', {
    uid: 2
  });

  return {
    props: {
      friends: res.data.list
    }
  }
}