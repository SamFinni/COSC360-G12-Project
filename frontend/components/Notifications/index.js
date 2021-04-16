import { useState } from 'react';
import useInterval from '../../functions/useInterval';
import Link from 'next/link';
import axios from 'axios';
import update from 'immutability-helper';
import useLocalStorage from '../../functions/useLocalStorage';
import styles from '../../styles/components/Notifications.module.css';
import { FaRegBell } from 'react-icons/fa';
import * as cfg from '../../config';
const backend = 'https://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

export default function Notifications() {
  const [auth, ] = useLocalStorage('auth', { email: null, uid: null, username: null, authkey: null });
  const [notis, setNotis] = useState([]);
  const [expand, setExpand] = useState(false);
  const pollTime = 5000;

  async function getNotifications() {
    const notifications = await axios.post(backend + '/notification/list', {
      uid: auth.uid
    });
    setNotis(notifications.data.list);
  }
  useInterval(async () => {
    if (!auth.uid || expand) return;
    getNotifications();
  }, pollTime);

  function notiMouseOver(nid, idx) {
    if (notis[idx].seen) return;
    
    axios.post(backend + '/notification/seen', {
      id: nid
    });

    const temp = update(notis, {[idx]: {seen: {$set: true}}});
    setNotis(temp);
  }
  
  if (notis.length == 0) return null;

  let notiList = notis.map((n, idx) => {
    if (n.link) return (
      <Link key={`noti-${idx}`} href={n.link}>
        <div className={`${styles.notiBox} ${!n.seen ? styles.newNoti : null}`} style={{ cursor: 'pointer' }} onMouseOver={() => notiMouseOver(n.id, idx)}>
          <p className={styles.notiTitle}>{n.title}</p>
          <p className={styles.notiText}>{n.text}</p>
        </div>
      </Link>
    );
    else return (
      <div key={`noti-${idx}`} className={`${styles.notiBox} ${!n.seen ? styles.newNoti : null}`} onMouseOver={() => notiMouseOver(n.id, idx)}>
        <p className={styles.notiTitle}>{n.title}</p>
        <p className={styles.notiText}>{n.text}</p>
      </div>
    )
  });

  return (
    <>
    { expand
      ? <div className={styles.full} onClick={() => setExpand(false)} />
      : null
    }
    <div className={styles.container}>
      <div className={styles.iconContainer} onClick={() => setExpand(!expand)}>
        <div className={styles.newIcon} />
        <div className={styles.icon}>
          <FaRegBell size={'32px'} />
        </div>
      </div>
      {expand ? notiList : null}
    </div>
    </>
  );
}