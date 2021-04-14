import { useEffect, useState } from "react";
import Link from 'next/link';
import styles from '../../styles/components/PostPreview.module.css';
import axios from 'axios';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { HiShare } from 'react-icons/hi';
import { toast } from 'react-toastify';
import * as cfg from '../../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;


// structure of a post:
// post { pid, title, body, tags, createdAt, uid, username, image, score }
export default function PostPreview({ data }) {

  const [scoreChange, setScoreChange] = useState(0); // the change in score when voting
  const [score, setScore] = useState(0); // the score of the post considering votes

  async function initializeScore() {
    setScore(data.score);
  }
  useEffect(() => {
    initializeScore();
  }, []);

  function updateScore(s) {
    // change/reset scoreChange arrows
    if (scoreChange == 0) setScoreChange(s ? 1 : -1);
    else if (scoreChange == 1) setScoreChange(s ? 0 : -1);
    else if (scoreChange == -1) setScoreChange(s ? 1 : 0);
    updateDatabaseScore();
  }

  function updateDatabaseScore() {
    console.log(score+scoreChange);
    
    /*
    const pid = data.pid;
    const newScore = score+scoreChange;
    axios.post(backend + "/postscore/updatePostScore", {
      pid,
      newScore,
    })
    */
  }

  function getShareLink() {
    navigator.clipboard.writeText(window.location.href + 'viewPost/' + data.pid);
    toast("Post link copied to clipboard!");
  }

  const scoreHighlightUp = { color: 'Cyan', filter: 'drop-shadow(0 0 2px #000)' }
  const scoreHighlightDown = { color: 'Orange', filter: 'drop-shadow(0 0 2px #000)' }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link href={`/user/${data.uid}`}>
          <a>
            <div className={styles.user}>
              <img className={styles.pic} src={data.image} alt="placeholder"/>
              <p className={styles.username}>@{data.username}</p>
            </div>
          </a>
        </Link>
        <div className={styles.interact}>
          <div className={styles.score}>
            <div className={styles.uparrow} onClick={() => updateScore(true)}>
              <IoIosArrowUp style={scoreChange == 1 ? scoreHighlightUp : {}} size={'2em'} />
            </div>
            <p className={styles.scoreText}>{score+scoreChange}</p>
            <div className={styles.downarrow} onClick={() => updateScore(false)}>
              <IoIosArrowDown style={scoreChange == -1 ? scoreHighlightDown : {}} size={'2em'} />
            </div>
          </div>
          <div className={styles.share} onClick={() => getShareLink()}>
            <HiShare size={'3em'} />
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.head}>
          <Link href={`/viewPost/${data.pid}`}>
            <a><h2 className={styles.title}>{data.title}</h2></a>
          </Link>
          <p className={styles.date}>{data.createdAt.substring(0,10)}</p>
        </div>
        <div className={styles.bodyContainer}>
          <div style={{ overflow: 'hidden', height: '100%', textOverflow: 'ellipsis' }}>
            <p className={styles.body}>
              {data.body}
            </p>
          </div>
        </div>
        <div>
          <Link href={`/viewPost/${data.pid}`}>
            <a className={styles.readMore}>Read More</a>
          </Link>
        </div>
      </div>
    </div>
  );
}