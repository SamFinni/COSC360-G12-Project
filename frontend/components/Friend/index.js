import Link from 'next/link';
import styles from '../../styles/components/Friend.module.css';

export default function Friend({ data }) {
  const imgSource = data.image ?? '/user.png';
  return (
    <Link href={`/viewprofile/${data.id}`}>
      <div className={styles.container}>
        <div className={styles.user}>
          <img className={styles.pic} src={imgSource} />
          <p className={styles.username}>@{data.username}</p>
        </div>
      </div>
    </Link>
  );
}