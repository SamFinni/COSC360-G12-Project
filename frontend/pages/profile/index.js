import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/ViewProfilePage.module.css';
import Footer from '../../components/Footer';
import Profile from '../../components/ViewProfile';
const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});

export default function ProfilePage(props) {
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
          {props.friends.map((user, idx) => (
            <Profile key={`user-${idx}`} data={user} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const friends = [
    { uid: 132624, username: 'KangaRupert', pic: '/pic1.png' },
  
  ];

  return {
    props: {
      friends
    }
  }
}