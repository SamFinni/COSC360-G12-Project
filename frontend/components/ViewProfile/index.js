import Link from 'next/link';
import styles from '../../styles/components/Profile.module.css';

export default function Profile({ data }) {
  return (
        <div className={styles.user}>
          <img className={styles.pic} src={data.pic} />
          <p className={styles.username}>@{data.username}</p>
          <p className={styles.bio}>{data.bio}</p>
        </div>
  );
}