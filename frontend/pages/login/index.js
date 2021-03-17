import Head from "next/head";
import { useRouter } from 'next/router';
import { useState } from "react";
import dynamic from "next/dynamic";
import useLocalStorage from '../../functions/useLocalStorage';
import styles from "../../styles/pages/LoginPage.module.css";
import Footer from "../../components/Footer";

const Header = dynamic(() => import("../../components/Header"), {
  ssr: false,
});
const Navbar = dynamic(() => import("../../components/Navbar"), {
  ssr: false,
});

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [auth, setAuth] = useLocalStorage('auth', { email: null, username: null, authkey: null });
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function submitHandler(){
    if(!validateForm()){
      alert("Please fill out the form!");
      return;
    }
    
    setAuth({ email: "test@test.com", username, authkey: "abc123" });
    router.push('/');
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
          <form className={styles.form} onSubmit= {submitHandler}>
            <div className={styles.input}>
              <label for="uname" className={styles.label}>
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
              <label for="psw" className={styles.label}>
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

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
