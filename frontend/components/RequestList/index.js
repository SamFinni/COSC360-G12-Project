import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import useLocalStorage from '../../functions/useLocalStorage';
import styles from '../../styles/components/RequestList.module.css';
import * as cfg from '../../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

export default function RequestList() {
  const [auth, ] = useLocalStorage('auth', { email: null, uid: null, username: null, authkey: null });
  const [requests, setRequests] = useState([]);

  async function getRequests() {
    if (!auth.uid) return;
    const f = await axios.post(backend + '/friend/requests', {
      uid: auth.uid,
    });
    setRequests(f.data.list);
  }
  useEffect(() => getRequests(), []);

  async function acceptRequest(fuid) {
    await axios.post(backend + '/friend/add', {
      uid: auth.uid,
      fuid,
    }).then(() => getRequests());
  }

  async function denyRequest(fuid) {
    await axios.post(backend + '/friend/remove', {
      uid: auth.uid,
      fuid,
    }).then(() => getRequests());
  }

  if (requests.length === 0) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Friend Requests</h3>
      <div className={styles.requestlist}>
        {requests.map((request, idx) => (
            <div className={styles.user} key={`request-${request.id}`}>
              <Link href={`/user/${request.id}`}>
                <div className={styles.userContainer}>
                  <img className={styles.pic} src={request.image  ?? '/user.png'} />
                  <p className={styles.username}>@{request.username}</p>
                </div>
              </Link>
              <div>
                <div className={styles.accept} onClick={() => acceptRequest(request.id)}>Accept</div>
                <div className={styles.deny} onClick={() => denyRequest(request.id)}>Deny</div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}