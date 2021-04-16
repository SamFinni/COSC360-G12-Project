import axios from "axios";
import { useEffect, useState } from "react";
import useLocalStorage from "../../functions/useLocalStorage";
import styles from "../../styles/components/Profile.module.css";
import * as cfg from "../../config";
const backend = "https://" + cfg.BACKEND_IP + ":" + cfg.BACKEND_PORT;

export default function Profile() {
  const [auth, setAuth] = useLocalStorage("auth", {
    email: null,
    uid: null,
    username: null,
    authkey: null,
  });
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");
  const [editing, setEditing] = useState(false);

  async function getUserData() {
    const userData = await axios.post(backend + "/user/getUser", {
      uid: auth.uid,
    });
    setUsername(userData.data[0].username);
    setBio(userData.data[0].bio);
    setPic(userData.data[0].image);
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
  async function updateUserData() {
    const userData = await axios.post(backend + "/user/updateUser", {
      uid: auth.uid,
      bio,
      username,
      pic,
    });
    await setAuth({ ...auth, username });
    window.location.reload();
  }

  useEffect(getUserData, [auth]);
  let editField = <></>;
  if (editing == false) {
    editField = (
      <>
        <img className={styles.pic} src={pic != "" ? pic : "/user.png"} />
        <p id="un" className={styles.username}>
          <b>@{username}</b>
        </p>
        <p id="bi" className={styles.bio}>
          {bio}
        </p>
      </>
    );
  } else {
    editField = (
      <>
        <img className={styles.pic} src={pic != "" ? pic : "/user.png"} />
        <div className={styles.input}>
          <label htmlFor="pic" className={styles.label}>
            <b>Choose a new image: </b>
          </label>
          <input
            id="pic"
            type="file"
            onChange={(e) => handlePic(e.target.files[0])}
          ></input>
        </div>
        <div className={styles.input}>
          <label htmlFor="uname" className={styles.label}>
            <b>Username: </b>
          </label>
          <input
            className={styles.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="uname"
            required
          ></input>
        </div>
        <div className={styles.input}>
          <label htmlFor="bio" className={styles.label}>
            <b>Bio: </b>
          </label>
          <input
            className={styles.bio}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            type="text"
            id="bio"
            required
          ></input>
        </div>
        <div className={styles.button} onClick={updateUserData}>
          Done
        </div>
      </>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.user}>
        <img
          className={styles.edit}
          src={"/edit.png"}
          onClick={() => setEditing(!editing)}
        />
        {editField}
      </div>
    </div>
  );
}
