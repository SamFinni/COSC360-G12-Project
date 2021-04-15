{/*
  COMPLETED
  April 13th, 2021
  Matthew Borle


  FEATURES:
    Authenticate User
      > Search for user
          > Enable/Disable user (Ban/Unban)
          > Admin/RevokeAdmin
      > View all Reports
        > Search Reports by keyword
          > Dismiss Report
          > View Post
            > Remove Post *
            > Remove Comments on Post *

    * refers to features after redirect
*/}

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


export default function Admin() {

  // Defaults:
  //  Users: display all users that are disabled OR admin
  //  Reports: display all reports
  const [users, setUsers] = useState([]);               // Currently displayed users
  const [reports, setReports] = useState([]);           // Currently displayed reports
  const [totalusers, setTotalUsers] = useState([]);     // All users
  const [totalreports, setTotalReports] = useState([]); // All reports
  async function getReports(){
    // get default selection
    await axios.post(backend + '/postreport/list').then(data => setReports(data.data.list));
    await axios.post(backend + '/postreport/list').then(data => setTotalReports(data.data.list));
  }
  async function getUsers(){
    // get default selection
    await axios.post(backend + '/user/listDisabledAndAdmin').then(data => setUsers(data.data.list));
    await axios.post(backend + '/user/list').then(data => setTotalUsers(data.data.list));
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
    else // If no reports are found, return a defined but empty array to state.
      setReports([]);
  }


  //Reset to defaults
  function handleReportReset(event){
    event.preventDefault();
    getReports();
  }
  function handleUserReset(event){
    event.preventDefault();
    getUsers();
  }


  // RENDER ===============================================================================================================
  return (
    <div>
      <div className={styles.page}>
        <Head>
          <title>Blogaru - Admin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Navbar />
          <div className={styles.container}>
            <span className={styles.left}><h2 className={styles.title}>Users </h2></span>
            <span className={styles.right}><span className={styles.subtitle}>{users.length}</span> / {totalusers.length}</span>
            
            <form onSubmit={handleUserSubmit} className={styles.inline}>
              <input className={styles.textinput}
                type = "text"
                name = "input"
                placeholder = "Search or Filter"
              />
              <input className={styles.textinput}
                type = "submit"
                value = "Update"
              />
            </form>
            <form onSubmit={handleUserReset} className={styles.inline}>
              <input className={styles.textinput}
                type = "submit"
                value = "Reset"
              />
            </form>
            <hr className={styles.separator}></hr>

              <div className={styles.users}>
                {users.map((user, idx) => (
                  <AdminUser key={`user-${idx}`} data={user} />
                ))}
              </div>
          </div>

          
          <div className={styles.container}>
          <span className={styles.left}><h2 className={styles.title}>Reports </h2></span>
            <span className={styles.right}><span className={styles.subtitle}>{reports.length}</span> / {totalreports.length}</span>

            <form onSubmit={handleReportSubmit} className={styles.inline}>
              <input className={styles.textinput}
                type = "text"
                name = "input"
                placeholder = "Search or Filter"
              />
              <input className={styles.textinput}
                type = "submit"
                value = "Update"
              />
            </form>
            <form onSubmit={handleReportReset} className={styles.inline}>
              <input className={styles.textinput}
                type = "submit"
                value = "Reset"
              />
            </form>
            <hr className={styles.separator}></hr>

            <div className={styles.report}>
              {reports.map((report, idx) => (
                <AdminReport key={`report-${idx}`} data={report} />
              ))}
            </div>
          </div>
      </div>
      <Footer />
    </div>
  )
}