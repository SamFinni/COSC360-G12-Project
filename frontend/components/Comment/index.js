import { useEffect, useState } from "react";
import Link from 'next/link';
import styles from '../../styles/components/Comment.module.css';
import axios from 'axios';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { HiShare } from 'react-icons/hi';
import { toast } from 'react-toastify';
import * as cfg from '../../config';
import useLocalStorage from '../../functions/useLocalStorage';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

export default function Comment({data}) {

    const [pic, setPic] = useState("");
    const [scoreChange, setScoreChange] = useState(0); // the change in score when voting
    const [score, setScore] = useState(0); // the score of the post considering votes
    const [initialScore, setInitialScore] = useState(0);
    const [auth, setAuth] = useLocalStorage('auth');  // auth info: { email, uid, username, authkey }
    const [user, setUser] = useState(false);

    useEffect(() => {
        getUserData(data.uid);
        
    }, []);


    async function getUserData(id) {
        const userData = await axios.post(backend + "/user/getUser", {
          uid: id
        });
        setPic(userData.data[0].image);
    }

    function updateScore(s) {
        if (auth.uid != null) {
            var immediateScore = post.score;
            // change/reset scoreChange arrows
            if (scoreChange == 0) setScoreChange(s ? 1 : -1);
            else if (scoreChange == 1) setScoreChange(s ? 0 : -1);
            else if (scoreChange == -1) setScoreChange(s ? 1 : 0);
            // change/reset score value for display and database
            if (s) {
                if (scoreChange == 0 || scoreChange == -1)
                    setScore(immediateScore = initialScore + 1);
                else
                    setScore(immediateScore = initialScore);
            } else {
                if (scoreChange == 0 || scoreChange == 1)
                    setScore(immediateScore = initialScore - 1);
                else
                    setScore(immediateScore = initialScore);
            }
            updateDatabaseScore(immediateScore);
        }
        else {
            toast('Log in or sign up to vote!');
        }
    }

    function updateDatabaseScore(immediateScore) {
        const pid = post.pid;
        const newScore = immediateScore;
        axios.post(backend + "/postscore/updatePostScore", {
            pid,
            newScore,
        })
    }

    const scoreHighlightUp = { color: 'Cyan', filter: 'drop-shadow(0 0 2px #000)' }
    const scoreHighlightDown = { color: 'Orange', filter: 'drop-shadow(0 0 2px #000)' }

    return (
        <div className={styles.comment}>
            <div className={styles.left}>
                <Link href={`/user/` + data.uid}><img className={styles.pic} src={pic} /></Link>
                <span className={styles.username}>@{data.username}</span>

            </div>
            <div className={styles.right}>
                <div className={styles.bodyContainer}>
                    <p className={styles.body}>{data.body}</p>
                </div>
                <span className={styles.date}>{data.createdAt.substring(0, 10)}</span>

            </div>
            <div className={styles.interact}>
                        <div className={styles.score}>
                            <div className={styles.uparrow} onClick={() => updateScore(true)}>
                                <IoIosArrowUp style={scoreChange == 1 ? scoreHighlightUp : {}} size={'2em'} />
                            </div>
                            <p className={styles.scoreText}>{data.score}</p>
                            <div className={styles.downarrow} onClick={() => updateScore(false)}>
                                <IoIosArrowDown style={scoreChange == -1 ? scoreHighlightDown : {}} size={'2em'} />
                            </div>
                        </div>
                    </div>
        </div>
    )
}