import styles from '../../styles/components/AdminUser.module.css';


export default function AdminUser({ data }) {

    var disabledValue = false;
    var adminValue = false;

    function disabledChange(value){
        disabledValue = value;
        console.log("User: "+ data.id + ": disabledChange: "+value);
        // state not changed
    }
    function adminChange(value){
        adminValue = value;
        console.log("User: "+ data.id + ": adminChange: "+value);
        // state not changed
    }

    return (
    <div>
      <div className={styles.user}>
        <table className={styles.table}>
            <tr className={styles.tablerow}>
                <td rowspan="4"><img className={styles.pic} src='/pic1.png'></img></td>
                <td className={styles.tabletext}>
                    <div className={styles.text}>Username:</div>
                </td>
                <td className={styles.tabletext}>
                    <div className={styles.text}><span className={styles.emphasis}>{data.username}</span></div>
                </td>

                <td className={styles.tableCheckbox}>
                    <button className={styles.button} // Toggle button for disabled value
                        onClick={()=> disabledChange(!disabledValue)}
                        name="disabled"
                    ><span>Toggle Disabled</span></button>
                </td>

            </tr>
            <tr className={styles.tablerow}>
                <td className={styles.tabletext}>
                    <div className={styles.text}>Email:</div>
                </td>
                <td className={styles.tabletext}>
                    <div className={styles.text}><span className={styles.emphasis}>{data.email}</span></div>
                </td>

                <td className={styles.tableCheckbox}>
                    <button className={styles.button} // Toggle button for admin value
                        onClick={()=> adminChange(!adminValue)}
                        name="admin"
                    ><span>Toggle Admin</span></button>
                </td>
            </tr>
            
        </table>
            <hr className={styles.separator}></hr>
            <p className={styles.date}>ID: <span className={styles.emphasis}>{data.id}</span> &nbsp; Created: {data.createdAt.substring(0,10)}</p>
            <a className={styles.link} href={`/Profile/${data.id}`} target="_blank">View Profile</a>
      </div>
    </div>
    );
}