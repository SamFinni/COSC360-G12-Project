import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/AdminPage.module.css';
import Footer from '../../components/Footer';
import AdminReport from '../../components/AdminReport';
import AdminUser from '../../components/AdminUser';
import axios from 'axios';

{/*
  Feature Tree:

    Search for user
        > Enable/Disable user (Ban/Unban)
    View all Reports
        > Edit/Remove posts
        > Edit/Remove comments
*/}

const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});
import * as cfg from '../../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

export default function HomePage(props) {
  return (
    <div className={styles.page}>

        <Head>
          <title>Blogaru - Admin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Navbar />
          <h2 className={styles.title}>All Users ({props.users.length})</h2>
          <div className={styles.container}>
            <hr className={styles.separator}></hr>
              <div className={styles.users}>
                {props.users.map((user, idx) => (
                  <AdminUser key={`user-${idx}`} data={user} />
                ))}
              </div>
          </div>


          <h2 className={styles.title}>Active Reports ({props.reports.length})</h2>
          <div className={styles.container}>
            <hr className={styles.separator}></hr>
              <div className={styles.report}>
                {props.reports.map((user, idx) => (
                  <AdminReport key={`user-${idx}`} data={user} />
                ))}
              </div>
          </div>

      <Footer />

    </div>
  )
}



export async function getStaticProps() {
  const getpostreports = await axios.post(backend + '/postreport/list');
  const reports = getpostreports.data.list;
  const getusers = await axios.post(backend + '/user/list');
  const users = getusers.data.list;
  return {
    props: {
      reports,
      users
    }
  }
}