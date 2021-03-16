import Link from 'next/link';
import styles from '../../styles/components/Report.module.css';

export default function User({ data }) {
  return (
    <Link href={`/report/${data.rid}`}>
      <div className={styles.container}>

        <div className={styles.usera}>
          <img className={styles.pica} src={data.pic} />
          <p className={styles.usernamea}>@{data.username}</p>
        </div>

        <p className={styles.reported}>Reported</p>

        <div className={styles.userb}>
          <img className={styles.picb} src={data.pic} />
          <p className={styles.usernameb}>@{data.username}</p>
        </div>

      </div>
    </Link>
  );
}