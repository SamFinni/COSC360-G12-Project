import Link from "next/link";
import axios from 'axios';
import { useEffect, useState } from "react";
import useLocalStorage from '../../functions/useLocalStorage';
import styles from "../../styles/components/Profile.module.css";
import * as cfg from '../../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

export default function Profile({ data }) {
  const [auth, ] = useLocalStorage('auth', { email: null, uid: null, username: null, authkey: null });
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");

  async function getUserData() {
    const userData = await axios.post(backend + "/user/getUser", {
      uid: auth.uid,
    });
    console.log(userData);
    setUsername(userData.data[0].username);
    setBio(userData.data[0].bio);
  }
  async function updateUserData() {
    const userData = await axios.post(backend + "/user/updateUser", {
      uid: auth.uid,
    });
    console.log(userData);
    setUsername(userData.data[0].username);
    setBio(userData.data[0].bio);
  }
  useEffect(getUserData, [auth]); 

  return (

    <div className={styles.user}>
      <img className={styles.edit} src={'/edit.png'} />
      <img className={styles.pic} src={pic != "" ? pic : '/user.png'} />
      <p className={styles.username}>@{username}</p>
      <p className={styles.bio}>{bio}</p>
    </div>
  );
}
