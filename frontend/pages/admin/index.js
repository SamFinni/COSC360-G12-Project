import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/AdminPage.module.css';
import Footer from '../../components/Footer';
import User from '../../components/Report';

{/*
  Feature Tree:

    Search for user
        > Enable/Disable users (Ban/Unban)
        > View Reports per user
            > Edit/Remove posts
            > Edit/Remove comments
        > View all Reports
*/}

const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});

export default function HomePage(props) {
  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru - Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />



      <div className={styles.container}>
        <h1 className={styles.title}>Admin</h1>
        <div className={styles.adminpanel}>
          {props.reports.map((user, idx) => (
              <User key={`user-${idx}`} data={user} />
            ))}
        </div>
      </div>



      <Footer />
    </div>
  )
}



export async function getStaticProps() {
  const reports = [
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png' },
  ];

  return {
    props: {
      reports
    }
  }
}