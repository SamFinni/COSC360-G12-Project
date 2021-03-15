import Link from 'next/link';
import styles from '../../styles/components/Friend.module.css';

export default function Friend({ data }) {
  return (
    <Link href={`/user/${data.uid}`}>
      <div className={styles.container}>
        <div className={styles.user}>
          <img className={styles.pic} src={data.pic} />
          <p className={styles.username}>@{data.username}</p>
        </div>
      </div>
    </Link>
  );
}