import Link from 'next/link';
import styles from '../../styles/components/ViewPost.module.css';
import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { HiShare } from 'react-icons/hi';

export default function ViewPost({ data }) {
    const [score, setScore] = useState(0);
    function updateScore(s) {
        if (score == 0) setScore(s ? 1 : -1);
        else if (score == 1) setScore(s ? 0 : -1);
        else if (score == -1) setScore(s ? 1 : 0);
    }

    function getShareLink() {
        navigator.clipboard.writeText(window.location.href + 'post/' + data.pid);
        toast("Post link copied to clipboard!");
    }

    function addComment() {
        alert("Post comment.");
    }

    const scoreHighlight = { color: '#a7eee8', filter: 'drop-shadow(0 0 2px #000)' }
    
    return (
        <div>
            <div className={styles.user}>
                <Link href={`/user/${data.uid}`}>
                    <img className={styles.pic} src={data.pic} />
                </Link>
                <Link href={`/user/${data.uid}`}>
                    <p className={styles.username}>@{data.username}</p>
                </Link>
            </div>
            <span className={styles.date}>{data.date}</span>
            <div>
                <h2>{data.title}</h2>
                <p>{data.body}</p>
            </div>
            <div className={styles.interact}>
                <div className={styles.score}>
                    <div className={styles.arrow} onClick={() => updateScore(true)}>
                        <IoIosArrowUp style={score == 1 ? scoreHighlight : {}} size={'2em'} />
                    </div>
                    <p className={styles.scoreText}>{data.score + score}</p>
                    <div className={styles.arrow} onClick={() => updateScore(false)}>
                        <IoIosArrowDown style={score == -1 ? scoreHighlight : {}} size={'2em'} />
                    </div>
                </div>
                <div className={styles.share} onClick={() => getShareLink()}>
                    <HiShare size={'3em'} />
                </div>
            </div>
            <div className={styles.commentSection}>
                <h3>Comments</h3>
                { `${data.comments}`.length ? (
                    <p>{data.comments}</p>
                    ) : (
                    <p>There are no comments.</p>
                )}
                <div className={styles.addComment}>
                    <textarea className={styles.commentInput} id="commentInput" refs="newCommentInput"></textarea>
                    <a className={styles.addCommentButton} onClick={() => addComment()}>Add a comment</a>
                </div>
            </div>
        </div>
    );
}