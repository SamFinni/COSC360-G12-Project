import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useLocalStorage from '../../functions/useLocalStorage';
import styles from "../../styles/pages/LoginPage.module.css";
import Footer from "../../components/Footer";
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as cfg from '../../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

const Header = dynamic(() => import("../../components/Header"), {
  ssr: false,
});
const Navbar = dynamic(() => import("../../components/Navbar"), {
  ssr: false,
});

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [auth, setAuth] = useLocalStorage('auth', { email: null, uid: null, username: null, authkey: null });
  
  async function login() {
    const userData = await axios.post(backend + "/user/login", {
      username, password,
    });
    if(userData.data.message){
      setError(userData.data.message);
      return;
    }
    setAuth({email: userData.data[0].email, uid: userData.data[0].id, username: userData.data[0].username})
    router.push('/');
  }
  
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function submitHandler() {
    if (!validateForm()) {
      toast("Please fill out the form!");
      return;
    }
    
    login();
  }
 let errorElement = <></>;
 if(error != ""){
   errorElement = <p>{error}</p>;
 }
  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.input}>
              <label htmlFor="uname" className={styles.label}>
                <b>Username</b>
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter Username"
                id="uname"
                required
              ></input>
            </div>
            <div className={styles.input}>
              <label htmlFor="psw" className={styles.label}>
                <b>Password</b>
              </label>
              <input
               value={password}
               onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password"
                id="pwd"
                required
              ></input>
            </div>
            <Link href="/resetPassword"><p style={{ cursor: 'pointer' }}>Forgot Password?</p></Link>
            <div className={styles.button} onClick={submitHandler}>Login</div>
          </form>
          {errorElement}
        </div>
      </div>
      <Footer />
    </div>
  );
}
