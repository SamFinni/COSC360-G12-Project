import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/LoginPage.module.css';
import Footer from '../../components/Footer';

const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});

export default function Login(props) {
 

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
     <form>
     <label for="uname" className={styles.label}><b>Username</b></label>
    <input type="text" placeholder="Enter Username" id="uname" required></input>

    <label for="psw" className={styles.label}><b>Password</b></label>
    <input type="password" placeholder="Enter Password" id="pwd" required></input>

<p>Forgot Password?</p> 
    <button type="submit">Login</button>
     </form>
      </div>
      <Footer />
    </div>
  )
}

