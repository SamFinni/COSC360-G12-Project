import { useState, useEffect } from 'react';
import axios from 'axios';
import useInterval from '../../functions/useInterval';
import useLocalStorage from '../../functions/useLocalStorage';
import styles from '../../styles/components/FriendList.module.css';
import Friend from '../../components/Friend';
import * as cfg from '../../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

export default function FriendList() {
  const [auth, ] = useLocalStorage('auth', { email: null, uid: null, username: null, authkey: null });
  const [friends, setFriends] = useState([]);
  const pollTime = 5000;

  async function getFriends() {
    if (!auth.uid) return;
    const f = await axios.post(backend + '/friend/list', {
      uid: auth.uid,
    });
    setFriends(f.data.list);
  }
  useEffect(() => getFriends(), []);
  useInterval(async () => {
    if (!auth.uid) return;
    getFriends();
  }, pollTime);

  return (
    <div className={styles.friendlist}>
      {friends.map((friend, idx) => (
        <Friend key={`friend-${friend.id}`} data={friend} />
      ))}
    </div>
  );
}