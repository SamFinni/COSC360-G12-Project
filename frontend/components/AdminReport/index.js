import styles from '../../styles/components/AdminReport.module.css';
import axios from 'axios';
import * as cfg from "../../config";
const backend = "http://" + cfg.BACKEND_IP + ":" + cfg.BACKEND_PORT;

export default function AdminReport({ data }) {

  const pid = data.pid;

  function dismiss(){
    if(confirm("Are you sure you wish to dismiss the report with ID = " + pid + "?"))
    {
      // dismiss report
      const userData = axios.post(backend + "/postreport/delete", {
          id: data.id,
      });
      console.log(userData);
      // force reload page
      window.location.reload();
    }
  }

  return (
    <div>
      <div className={styles.report}>
            <p className={styles.text}>User with ID: <span className={styles.emphasis}>{data.uid}</span> reported Post with ID: <span className={styles.emphasis}>{pid}</span></p>
            <hr className={styles.separator}></hr>
            <div className={styles.text}>{data.reason}</div>
            <hr className={styles.separator}></hr>
            <p className={styles.date}>ID: <span className={styles.emphasis}>{data.id}</span> &nbsp; Created: {data.createdAt.substring(0,10)}</p>
            <a className={styles.link} href={`/post/${pid}`} target="_blank"><span>Post</span></a>
            <button className={styles.button} // Toggle button for disabled value
              onClick={()=> dismiss()}
              name="dismiss"
            ><span>Dismiss</span></button>
      </div>
    </div>
  );
}

