import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/AdminPage.module.css';
import Footer from '../../components/Footer';
import User from '../../components/AdminReport';
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


        <div className={styles.container}>
          <h2 className={styles.title}>Search Users</h2>
          <hr></hr>
          <form>
            <label>
              Username:
              <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        <div className={styles.container}>
          <h2 className={styles.title}>Active Reports ({props.reports.length})</h2>
          <hr></hr>
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
  const res = await axios.post(backend + '/postreport/list');
  const reports = res.data.list;
  return {
    props: {
      reports
    }
  }
}