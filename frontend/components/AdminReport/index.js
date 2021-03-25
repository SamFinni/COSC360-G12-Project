import Link from 'next/link';
import styles from '../../styles/components/AdminReport.module.css';

export default function User({ data }) {
  return (
    <Link href={`/report/${data.id}`}>
      <div className={styles.report}>
            <p className={styles.text}>User with id: <span className={styles.emphasis}>{data.uid}</span> reported Post with id: <span className={styles.emphasis}>{data.pid}</span></p>
            <p className={styles.date}>{data.date}</p>
      </div>
    </Link>
  );
}