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
      > Search Reports by keyword
        > Dismiss Report
        > View Post
          > Edit/Remove Post
          > Edit/Remove Comment
*/}


{/*
  REMAINING ISSUES:
    - Footer is not pinned to the bottom of the screen, if no users or reports are returned
      the footer will be elevated.
*/}

export default function AdminPage() {


  // Defaults:
  //  Users: display all users that are disabled OR admin
  //  Reports: display all reports
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  async function getReports(){
    const getUsers = await axios.post(backend + '/postreport/list')
    setReports(getUsers.data.list);
  }
  async function getUsers(){
    const getReports = await axios.post(backend + '/user/listDisabledAndAdmin')
    setUsers(getReports.data.list);
  }
  useEffect(() => {
    getReports();
    getUsers();
  }, []);




  // Search Users handler
  function handleUserSubmit(event){
    event.preventDefault();
    const username = event.target.input.value;
    const email = event.target.input.value;
    // Search for users with input anywhere in username or email
    axios.post(backend + "/user/searchLike", {
      username,
      email,
    }).then(data => updateUsers(data.data));
  }

  // Apply search results to users state variable
  function updateUsers(data){
    if(data.length > 0)
      setUsers(data);
    else // If no users are found, return a defined, empty array.
      setUsers([]);
  }




  // Search Reports handler
  function handleReportSubmit(event){
    event.preventDefault();
    const reason = event.target.input.value;
    const createdAt = event.target.input.value;
    // Search for reports with input anywhere in reason or createdAt
    axios.post(backend + "/postreport/searchLike", {
      reason,
      createdAt,
    }).then(data => updateReports(data.data));
  }

  // Apply search results to reports state variable
  function updateReports(data){
    if(data.length > 0)
      setReports(data);
    else // If no reports are found, return a defined, empty array.
      setReports([]);
  }



  // RENDER ===============================================================================================================

  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru - Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Navbar />
        <div className={styles.container}>
          <h2 className={styles.title}>Users </h2><span className={styles.subtitle}>({users.length})</span>
          
          <form onSubmit={handleUserSubmit}>
            <hr className={styles.separator}></hr>
            <h3 className={styles.lefttext}>Search Users: </h3>
            <input className={styles.textinput}
              type = "text"
              name = "input"
            />
            <hr className={styles.separator}></hr>
          </form>

            <div className={styles.users}>
              {users.map((user, idx) => (
                <AdminUser key={`user-${idx}`} data={user} />
              ))}
            </div>
        </div>

        
        <div className={styles.container}>
          <h2 className={styles.title}>Active Reports </h2><span className={styles.subtitle}>({reports.length})</span>

          <form onSubmit={handleReportSubmit}>
            <hr className={styles.separator}></hr>
            <h3 className={styles.lefttext}>Search Reports: </h3>
            <input className={styles.textinput}
              type = "text"
              name = "input"
            />
            <hr className={styles.separator}></hr>
          </form>

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