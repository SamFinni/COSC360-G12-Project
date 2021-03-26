import styles from '../../styles/components/AdminUser.module.css';

export default function AdminUser({ data }) {
  return (
    <div>
      <div className={styles.user}>
            <p className={styles.text}>ID<span className={styles.emphasis}>{data.uid}</span> reported Post with ID: <span className={styles.emphasis}>{data.pid}</span></p>
            <a className={styles.link} href={`/viewPost/${data.id-1}`} target="_blank">View Post</a>
      </div>
    </div>
  );
}