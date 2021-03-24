import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useLocalStorage from "../../functions/useLocalStorage";
import dynamic from "next/dynamic";
import styles from "../../styles/pages/NewAccountPage.module.css";
import Footer from "../../components/Footer";
import Link from 'next/link';

const Header = dynamic(() => import("../../components/Header"), {
  ssr: false,
});
const Navbar = dynamic(() => import("../../components/Navbar"), {
  ssr: false,
});

export default function Signup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [auth, setAuth] = useLocalStorage("auth", {
    email: null,
    username: null,
    authkey: null,
  });
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function submitHandler() {
    if (!validateForm()) {
      alert("Please fill out the form!");
      return;
    }

    setAuth({ email: "test@test.com", username, authkey: "abc123" });
    router.push("/");
  }
  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru - Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <div className={styles.container}>
        <h1 className={styles.title}>Create a New Account</h1>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.input}>
              <p>Upload a profile picture</p>
            </div>
            <div className={styles.input}>
              <label for="email" className={styles.label}>
                <b>Email</b>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                id="email"
                required
              ></input>
            </div>
            <div className={styles.input}>
              <label for="uname" className={styles.label}>
                <b>Desired Username</b>
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter Username"
                id="uname"
                required
              ></input>
            </div>{" "}
            <div className={styles.input}>
              <label for="bio" className={styles.label}>
                <b>Bio</b>
              </label>
              <textarea placeholder="Enter Bio" id="bio" required></textarea>
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
            <Link href={`/success`}>
              <a className={styles.button}>Reset</a>
            </Link>
            <Link href={`/success`}>
              <a className={styles.button}>Submit</a>
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
