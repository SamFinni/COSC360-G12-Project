import Link from 'next/link';
import styles from '../../styles/components/AdminReport.module.css';

export default function User({ data }) {
  return (
    <Link href={`/report/${data.rid}`}>
      <div className={styles.report}>
          <div className={styles.user}>
            <img className={styles.pic} src={data.pic} />
            <p className={styles.username}>@{data.username}</p>
            <p className={styles.date}>{data.date}</p>
          </div>
      </div>
    </Link>
  );
}