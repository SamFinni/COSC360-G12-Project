import styles from '../../styles/components/AdminUser.module.css';


export default function AdminUser({ data }) {

    // Borders
    const defaultBorderColor = "3px outset #b7cecd"; // default border colour for when user is not admin or disabled
    const adminBorderColor = "3px outset #adfbad"; // border colour for when user is admin
    const disabledBorderColor = "3px outset #ff9966"; // border colour for when user is disabled
    var currentBorderColor = defaultBorderColor; // current border color begins as default
    // Backgrounds
    const defaultBackgroundColor = "#e9ebf0"; // default background colour for when user is not admin or disabled
    const adminBackgroundColor = "#d3f2dc"; // background colour for when user is admin
    const disabledBackgroundColor = "#f0d9c9"; // background colour for when user is disabled
    var currentBackgroundColor = defaultBackgroundColor; // current background color begins as default
    // Admin crown
    const Adminpic = "crown.png";
    const AdminAlt = "Admin";
    // Disabled crown
    const Disabledpic = "cross.png";
    const DisabledAlt = "Disabled";
    // Picture beside Username
    var splashPic = "";
    var splashAlt = "";

    var disabledValue = false;
    var adminValue = false;

    function disabledChange(value){
        disabledValue = value;
        if(confirm("Are you sure you wish to disable the user with ID = " + data.id + "?"))
        {
            // disable user
            alert("disable user Confirmed!");
        }
    }
    function adminChange(value){
        adminValue = value;
        if(confirm("Are you sure you wish to give administrator status to the user with ID = " + data.id + "?"))
        {
            // admin user
            alert("admin user Confirmed!");
        }
    }

    if(data.admin)
    {
        currentBorderColor = adminBorderColor;
        currentBackgroundColor = adminBackgroundColor;
        splashPic = Adminpic;
        splashAlt = AdminAlt;
    }
    if(data.disabled)
    {
        currentBorderColor = disabledBorderColor;
        currentBackgroundColor = disabledBackgroundColor;
        splashPic = Disabledpic;
        splashAlt = AdminAlt;
    }

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
                    <div className={styles.text}><span className={styles.emphasis}>{data.username}</span></div><img className={styles.crownpic} src={splashPic} alt={splashAlt}></img>
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
            <a className={styles.link} href={`/Profile/${data.id}`} target="_blank"><span>View Profile</span></a>
      </div>
    </div>
    );
}