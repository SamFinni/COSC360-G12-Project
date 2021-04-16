import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as cfg from '../../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;
import dynamic from "next/dynamic";
import styles from '../../styles/pages/ResetPassword.module.css';
import Footer from '../../components/Footer';
const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const key = router.query.key;
  const uid = router.query.uid;

  async function resetPassword() {
    if (password.length == 0) {
      toast("Please enter a password!");
      return;
    }

    await axios.post(backend + "/user/resetPassword", {
      key, uid, password,
    }).then((res) => {
      if (res.status == 200 && res.data.id == 0) toast("Password successfully reset! You may now login.");
      else toast("Error resetting password. Please try requesting a new email.");
    });
  }

  async function sendEmail() {
    if (email.length == 0) {
      toast("Please enter an email!");
      return;
    }

    await axios.post(backend + "/user/forgotPassword", {
      email,
    }).then((res) => {
      if (res.status == 200 && res.data.id == 0) toast("Password reset email sent.");
      else toast("Error resetting password. Please try requesting a new email.");
    }).catch((err) => {
      toast("Error resetting password. Please try requesting a new email.");
    });
  }

  let element = <></>;
  if (key) element = (
    <div className={styles.formContainer}>
      <h2>Reset Password</h2>
      <p>Enter your new password</p>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
      />
      <br />
      <div className={styles.button} onClick={resetPassword}>Submit</div>
    </div>
  );
  else element = (
    <div className={styles.formContainer}>
      <h2>Reset Password</h2>
      <p>Enter your account email</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
        required
      />
      <br />
      <div className={styles.button} onClick={sendEmail}>Submit</div>
    </div>
  )

  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru - Contact</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <div className={styles.container}>
        {element}
      </div>

      <Footer />
    </div>
  )
}