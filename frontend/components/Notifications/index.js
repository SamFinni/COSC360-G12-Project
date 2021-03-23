import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/components/Notifications.module.css';
import { FaRegBell } from 'react-icons/fa';

export default function Notifications() {
  const [notis, setNotis] = useState([]);
  const [expand, setExpand] = useState(false);

  function getNotifications() {
    const notifications = [
      {
        title: "I'm a noti!",
        text: "This is my text! This is my text! This is my text! This is my text! This is my text! This is my text! This is my text! This is my text! ",
      },
      {
        title: "Home",
        text: "Click me to go home!",
        link: "/",
      },
    ];
    setNotis(notifications);
  }
  useEffect(getNotifications, []);

  function notiClick() {
    setExpand(!expand);

    notis.forEach(n => {
      // set notification as 'seen' via api
    });
  }

  let notiList = null;
  if (notis.length > 0) notiList = notis.map(n => {
    if (n.link) return (
      <Link href={n.link}>
        <div className={styles.notiBox} style={{ cursor: 'pointer' }}>
          <p className={styles.notiTitle}>{n.title}</p>
          <p className={styles.notiText}>{n.text}</p>
        </div>
      </Link>
    );
    else return (
      <div className={styles.notiBox}>
        <p className={styles.notiTitle}>{n.title}</p>
        <p className={styles.notiText}>{n.text}</p>
      </div>
    )
  });

  let newIcon = null;
  if (notis.length > 0) newIcon = (
    <div className={styles.newIcon} />
  )

  return (
    <>
    { expand
      ? <div className={styles.full} onClick={notiClick} />
      : null
    }
    <div className={styles.container}>
      <div className={styles.iconContainer} onClick={notiClick}>
        {newIcon}
        <div className={styles.icon}>
          <FaRegBell size={'32px'} />
        </div>
      </div>
      {expand ? notiList : null}
    </div>
    </>
  );
}