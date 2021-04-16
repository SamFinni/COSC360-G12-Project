import { useEffect, useState } from "react";
import Link from 'next/link';
import styles from '../../styles/components/Comment.module.css';
import axios from 'axios';
import * as cfg from '../../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

export default function Comment({ data }) {
    const [pic, setPic] = useState("");

    useEffect(() => {
        getUserData(data.uid);
    }, []);

    async function getUserData(id) {
        const userData = await axios.post(backend + "/user/getUser", {
            uid: id
        });
        setPic(userData.data[0].image);
    }

    return (
        <div className={styles.comment}>
            <div className={styles.left}>
                <Link href={`/viewprofile/` + data.uid}><img className={styles.pic} src={pic} /></Link>
            </div>
            <div className={styles.right}>
                <div className={styles.detailsContainer}>
                    <Link href={`/viewprofile/` + data.uid}><span className={styles.username}>@{data.username}</span></Link>
                    <span className={styles.date}>{data.createdAt.substring(0, 10)}</span>
                </div>
                <div className={styles.bodyContainer}>
                    <p className={styles.body}>{data.body}</p>
                </div>

            </div>

        </div>
    )
}