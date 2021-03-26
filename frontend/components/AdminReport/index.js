import styles from '../../styles/components/AdminReport.module.css';

export default function AdminReport({ data }) {
  return (
    <div>
      <div className={styles.report}>
            <p className={styles.text}>User with ID: <span className={styles.emphasis}>{data.uid}</span> reported Post with ID: <span className={styles.emphasis}>{data.pid}</span></p>
            <hr className={styles.separator}></hr>
            <div className={styles.text}>{data.reason}</div>
            <hr className={styles.separator}></hr>
            <p className={styles.date}>{data.createdAt.substring(0,10)}</p>
            <a className={styles.link} href={`/viewPost/${data.id-1}`} target="_blank">View Post</a>
      </div>
    </div>
  );
}

