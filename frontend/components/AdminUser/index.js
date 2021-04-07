import styles from '../../styles/components/AdminUser.module.css';

export default function AdminUser({ data }) {

    var disabledValue = false;
    var adminValue = false;

    // TODO: make state update properly
    function disabledChange(value){
        //console.log("!!! disabledChange: "+value);
    }
    function adminChange(value){
        //console.log("!!! adminChange: "+value);
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
                    Disabled: 
                    <input
                        checked={disabledValue}
                        onChange={()=>disabledChange(disabledValue)}
                        type="checkbox"
                        name="disabled"
                    />
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
                    Admin: 
                    <input
                        checked={adminValue}
                        onChange={()=>adminChange(adminValue)}
                        type="checkbox"
                        name="admin"
                    />
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