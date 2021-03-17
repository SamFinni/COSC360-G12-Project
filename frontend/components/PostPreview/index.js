import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/components/PostPreview.module.css';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { HiShare } from 'react-icons/hi';
import { toast } from 'react-toastify';

export default function PostPreview({ data }) {
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

  const scoreHighlight = { color: '#a7eee8', filter: 'drop-shadow(0 0 2px #000)' }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link href={`/user/${data.uid}`}>
          <a>
            <div className={styles.user}>
              <img className={styles.pic} src={data.pic} />
              <p className={styles.username}>@{data.username}</p>
            </div>
          </a>
        </Link>
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
      </div>
      <div className={styles.right}>
        <div className={styles.head}>
          <Link href={`/post/${data.pid}`}>
            <a><h2 className={styles.title}>{data.title}</h2></a>
          </Link>
          <p className={styles.date}>{data.date}</p>
        </div>
        <div className={styles.bodyContainer}>
          <div style={{ overflow: 'hidden', height: '100%', textOverflow: 'ellipsis' }}>
            <p className={styles.body}>
              {data.body}
            </p>
          </div>
        </div>
        <div>
          {/* <Link href={`/post/${data.pid}`}> */}
          {/* temporary link */}
          <Link href={`/viewPost`}>
            <a className={styles.readMore}>Read More</a>
          </Link>
        </div>
      </div>
    </div>
  );
}