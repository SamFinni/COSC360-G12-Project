import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useLocalStorage from "../../functions/useLocalStorage";
import dynamic from "next/dynamic";
import styles from "../../styles/pages/NewAccountPage.module.css";
import Footer from "../../components/Footer";
import axios from "axios";
import { toast } from 'react-toastify';
import * as cfg from "../../config";
const backend = "http://" + cfg.BACKEND_IP + ":" + cfg.BACKEND_PORT;

const Header = dynamic(() => import("../../components/Header"), {
  ssr: false,
});
const Navbar = dynamic(() => import("../../components/Navbar"), {
  ssr: false,
});

export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");
  const router = useRouter();
  const [, setAuth] = useLocalStorage("auth", {
    email: null,
    username: null,
    authkey: null,
  });

  async function checkExists() {
    const userData = await axios.post(backend + "/user/checkExists", {
      username,
      email,
    });

    if (!userData.data) {
      addUser();
    } else {
      toast("Username and/or email are already taken!");
    }
  }

  async function addUser() {
    await axios.post(backend + "/user/insertUser", {
      email,
      username,
      bio,
      password,
      pic,
    });
    login();
  }

  async function login() {
    const userData = await axios.post(backend + "/user/login", {
      username,
      password,
    });

    if (userData.data.message) {
      toast(userData.data.message);
      return;
    }

    setAuth({
      email: userData.data[0].email,
      uid: userData.data[0].id,
      username: userData.data[0].username,
    });
    router.push("/");
  }

  function validateForm() {
    return username.length > 0 && password.length > 0 && email.length > 0;
  }
  function fileToDataUri(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
  function handlePic(file) {
    if (!file) {
      setPic("");
      return;
    }
    fileToDataUri(file).then((pic) => {
      setPic(pic);
    });
  }

  function submitHandler() {
    if (!validateForm()) {
      toast("Please fill out the form!");
      return;
    }
    checkExists();
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
              <label htmlFor="pic" className={styles.label}>
                <b>Upload image </b>
              </label>
              <input
                id="pic"
                type="file"
                onChange={(e) => handlePic(e.target.files[0])}
              ></input>
            </div>
            <div className={styles.input}>
              <label htmlFor="email" className={styles.label}>
                <b>Email</b>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Enter Email"
                id="email"
                required
              ></input>
            </div>
            <div className={styles.input}>
              <label htmlFor="uname" className={styles.label}>
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
              <label htmlFor="bio" className={styles.label}>
                <b>Bio</b>
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter Bio"
                id="bio"
                required
              ></textarea>
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
            <div className={styles.button} onClick={submitHandler}>
              Submit
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
