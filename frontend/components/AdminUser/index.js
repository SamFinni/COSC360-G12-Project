import styles from '../../styles/components/AdminUser.module.css';
import axios from 'axios';
import * as cfg from "../../config";
const backend = "http://" + cfg.BACKEND_IP + ":" + cfg.BACKEND_PORT;

export default function AdminUser({ data }) {

    const uid = data.id;
    // Borders
    const defaultBorderColor = "2px outset #b7cecd"; // default border colour for when user is not admin or disabled
    const adminBorderColor = "2px outset #adfbad"; // border colour for when user is admin
    const disabledBorderColor = "2px outset #ff9966"; // border colour for when user is disabled
    var currentBorderColor = defaultBorderColor; // current border color begins as default
    // Backgrounds
    const defaultBackgroundColor = "#e9ebf0"; // default background colour for when user is not admin or disabled
    const adminBackgroundColor = "#d3f2dc"; // background colour for when user is admin
    const disabledBackgroundColor = "#f0d9c9"; // background colour for when user is disabled
    var currentBackgroundColor = defaultBackgroundColor; // current background color begins as default
    // Picture beside Username
    var splashPic = "";
    var splashTitle = "";
    // Button text
    var adminButtonText = "Admin";
    var disableButtonText = "Disable";

    var disabledValue = false;
    var adminValue = false;

    function disabledChange(value){
        disabledValue = value;
        if(confirm("Are you sure you wish to disable the user with ID = " + uid + "?"))
        {
            // toggle disable user
            var disabled = !data.disabled;
            const userData = axios.post(backend + "/user/updateDisabled", {
                uid,
                disabled,
            });
            console.log(userData);
            // force reload page
            window.location.reload();
        }
    }
    function adminChange(value){
        adminValue = value;
        if(confirm("Are you sure you wish to give administrator status to the user with ID = " + uid + "?"))
        {
            // toggle admin user
            var admin = !data.admin;
            const userData = axios.post(backend + "/user/updateAdmin", {
                uid,
                admin,
            });
            console.log(userData);
            // force reload page
            window.location.reload();
        }
    }

    if(data.admin)
    {
        currentBorderColor = adminBorderColor;
        currentBackgroundColor = adminBackgroundColor;
        splashPic = "crown.png";
        splashTitle = "Admin";
        adminButtonText = "Revoke Admin";
    }
    if(data.disabled)
    {
        currentBorderColor = disabledBorderColor;
        currentBackgroundColor = disabledBackgroundColor;
        splashPic = "cross.png";
        splashTitle = "Disabled";
        disableButtonText = "Enable";
    }


    // Render:
    return (
    <div>
      <div className={styles.user} style={{border: currentBorderColor, backgroundColor: currentBackgroundColor}}>
        <table className={styles.table}>
            <tr className={styles.tablerow}>
                <td rowSpan="4"><img className={styles.pic} src='/pic1.png'></img></td>
                <td className={styles.tabletext}>
                    <div className={styles.text}>Username:</div>
                </td>
                <td className={styles.tabletext}>
                    <div className={styles.text}><span className={styles.emphasis}>{data.username}</span></div><img className={styles.crownpic} src={splashPic} title={splashTitle}></img>
                </td>

                <td className={styles.tableCheckbox}>
                    <button className={styles.button} // Toggle button for disabled value
                        onClick={()=> disabledChange(!disabledValue)}
                        name="disabled"
                    ><span>{disableButtonText}</span></button>
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
                    ><span>{adminButtonText}</span></button>
                </td>
            </tr>
            
        </table>
            <hr className={styles.separator}></hr>
            <p className={styles.date}>ID: <span className={styles.emphasis}>{uid}</span> &nbsp; Created: {data.createdAt.substring(0,10)}</p>
            <a className={styles.link} href={`/Profile/${uid}`} target="_blank"><span>Profile</span></a>
      </div>
    </div>
    );
}