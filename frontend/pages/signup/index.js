import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/NewAccountPage.module.css';
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
        <title>Blogaru - Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <div className={styles.container}>
        <h1 className={styles.title}>Create a New Account</h1>
     <form>
       <p>Upload an profile picture</p>
       <label for="email" className={styles.label}><b>Email</b></label>
       <input type="text" placeholder="Enter Email" id="email" required></input>
     <label for="uname" className={styles.label}><b>Desired Username</b></label>
    <input type="text" placeholder="Enter Username" id="uname" required></input>
    <label for="bio" className={styles.label}><b>Bio</b></label>
    <textarea placeholder="Enter Bio" id="bio" required></textarea>
    <label for="psw" className={styles.label}><b>Password</b></label>
    <input type="password" placeholder="Enter Password" id="pwd" required></input>
    
    <button type="reset">Clear Form</button>
    <button type="submit">Submit</button>
     </form>
      </div>
      <Footer />
    </div>
  )
}

