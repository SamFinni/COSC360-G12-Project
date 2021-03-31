import Link from "next/link";
import axios from 'axios';
import { useEffect, useState } from "react";
import useLocalStorage from '../../functions/useLocalStorage';
import styles from "../../styles/components/Profile.module.css";
import * as cfg from '../../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

export default function Profile({ data }) {
  const [auth, ] = useLocalStorage('auth', { email: null, uid: null, username: null, authkey: null });
  const [username, Setusername] = useState("");
  const [bio, setBio] = useState("");

  async function getUserData() {
    const userData = await axios.post(backend + "/user/select", {
      uid: auth.uid,
    });
    console.log(userData.data.list);
    setData(userData.data.list);
  }
  useEffect(getUserData, [auth]); 

  return (
    <div className={styles.user}>
      <img className={styles.pic} src={data.pic} />
      <p className={styles.username}>@{data.username}</p>
      <p className={styles.bio}>{data.bio}</p>
    </div>
  );
}
