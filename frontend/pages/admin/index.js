import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/AdminPage.module.css';
import Footer from '../../components/Footer';
import User from '../../components/AdminReport';

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
          <h1 className={styles.title}>Search Users</h1>
        </div>


        
        <div className={styles.container}>
          <h1 className={styles.title}>Active Reports</h1>
              <div className={styles.report}>
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
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic1.png', date: '3/17/2021' },
    { rid: 120000, username: 'KangaRupert', pic: '/pic2.png', date: '3/17/2021' },
  ];

  return {
    props: {
      reports
    }
  }
}