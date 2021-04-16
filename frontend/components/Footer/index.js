import Link from 'next/link';
import styles from '../../styles/components/Footer.module.css';
import { useEffect, useState } from "react";
import useLocalStorage from '../../functions/useLocalStorage';
import axios from 'axios';
const backend = 'https://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;
import * as cfg from '../../config';

export default function Footer() {

  const [adminLink, setAdminLink] = useState([]);

  // Auth: check if user is an admin
  const [auth, setAuth] = useLocalStorage('auth', { email: null, uid: null, username: null, authkey: null });
  useEffect(() => getThisUser(), [auth]);

  function getThisUser(){
    var uid = auth.uid;
    if (!uid) return;
    
    axios.post(backend + '/user/status', {
      uid,
    }).then(data => authenticate(data.data[0].admin));
  }
  function authenticate(admin){
    if(admin == 1){
      console.warn("You are logged in with ADMIN privileges!");
      setAdminLink("Admin");
    }
  }

  return(
    <>
      <div className={styles.container}>
        <Link href="/pp">
          <a>Privacy Policy</a>
        </Link>
        <Link href="/tos">
          <a>Terms of Service</a>
        </Link>
        <Link href="/contact">
          <a>Contact Us</a>
        </Link>
        <Link href="/admin"><b>{adminLink}</b></Link>
      </div>
    </>
  );
}
