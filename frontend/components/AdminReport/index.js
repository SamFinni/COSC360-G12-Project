import styles from '../../styles/components/AdminReport.module.css';

export default function AdminReport({ data }) {

  function dismiss(){
    if(confirm("Are you sure you wish to dismiss the report with ID = " + data.id + "?"))
    {
      // dismiss report
      alert("dismiss report Confirmed!");
    }
  }

  return (
    <div>
      <div className={styles.report}>
            <p className={styles.text}>User with ID: <span className={styles.emphasis}>{data.uid}</span> reported Post with ID: <span className={styles.emphasis}>{data.pid}</span></p>
            <hr className={styles.separator}></hr>
            <div className={styles.text}>{data.reason}</div>
            <hr className={styles.separator}></hr>
            <p className={styles.date}>ID: <span className={styles.emphasis}>{data.id}</span> &nbsp; Created: {data.createdAt.substring(0,10)}</p>
            <a className={styles.link} href={`/viewPost/${data.id-1}`} target="_blank"><span>Post</span></a>
            <button className={styles.button} // Toggle button for disabled value
              onClick={()=> dismiss()}
              name="dismiss"
            ><span>Dismiss</span></button>
      </div>
    </div>
  );
}

