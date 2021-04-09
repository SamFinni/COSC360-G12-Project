import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/AdminPage.module.css';
import Footer from '../../components/Footer';
import AdminReport from '../../components/AdminReport';
import AdminUser from '../../components/AdminUser';
import axios from 'axios';
import { useEffect, useState } from "react";
import * as cfg from '../../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;
const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});


{/*
  Feature Tree:

    Search for user
        > Enable/Disable user (Ban/Unban)
        > Admin/RevokeAdmin
    View all Reports
        > Dismiss Report
        > View Post
          > Edit/Remove Post
          > Edit/Remove Comment
*/}



export default function HomePage() {


  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  
  async function getReports(){
    const getUsers = await axios.post(backend + '/postreport/list')
    setReports(getUsers.data.list);
  }
  async function getUsers(){
    const getReports = await axios.post(backend + '/user/list')
    setUsers(getReports.data.list);
  }
  useEffect(() => {
    getReports();
    getUsers();
  }, []);


  return (
    <div className={styles.page}>
        <Head>
          <title>Blogaru - Admin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Navbar />
          {/*Users*/}
          <div className={styles.container}>
            <h2 className={styles.title}>Users</h2>
            <hr className={styles.separator}></hr>
            <div className={styles.users}>
                {users.map((user, idx) => (
                  <AdminUser key={`user-${idx}`} data={user} />
                ))}
            </div>
          </div>
          {/*Reports*/}
          <div className={styles.container}>
            <h2 className={styles.title}>Active Reports</h2>
            <hr className={styles.separator}></hr>
            <div className={styles.report}>
                {reports.map((user, idx) => (
                  <AdminReport key={`user-${idx}`} data={user} />
                ))}
            </div>
          </div>
      <Footer />
    </div>
  )

  
}