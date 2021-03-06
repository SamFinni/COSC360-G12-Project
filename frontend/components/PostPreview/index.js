import { useEffect, useState } from "react";
import Link from 'next/link';
import styles from '../../styles/components/PostPreview.module.css';
import axios from 'axios';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { HiShare } from 'react-icons/hi';
import { toast } from 'react-toastify';
import * as cfg from '../../config';
import useLocalStorage from '../../functions/useLocalStorage';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;


// structure of a post:
// post { pid, title, body, tags, createdAt, uid, username, image, score }
export default function PostPreview({ data }) {

  const [scoreChange, setScoreChange] = useState(0); // the change in score when voting
  const [score, setScore] = useState(0); // the score of the post considering votes
  const [initialScore, setInitialScore] = useState(0);

  // Auth: check if user is signed in
  const [auth, setAuth] = useLocalStorage('auth', { email: null, uid: null, username: null, authkey: null });
  const [pic, setPic] = useState("");


  var signedIn = false;
  useEffect(() => {
    initializeScore();
    getUserData();
  }, []);
  checkUserSignedIn();

  function checkUserSignedIn() {
    if(auth.uid != null) signedIn = true;
    else signedIn = false;
  }
  async function initializeScore() {
    setInitialScore(0);
    setScore(0);
    setScoreChange(0);
    setScore(data.score);
    setInitialScore(data.score);
  }
  async function getUserData() {
    const userData = await axios.post(backend + "/user/getUser", {
      uid: data.uid,
    });
    if(userData.data[0].image.length > 10){
      setPic(userData.data[0].image);
    }else{
        setPic('../user.png');
    }
  }

  function updateScore(s) {
    if(signedIn){
      var immediateScore = data.score;
      // change/reset scoreChange arrows
      if (scoreChange == 0) setScoreChange(s ? 1 : -1);
      else if (scoreChange == 1) setScoreChange(s ? 0 : -1);
      else if (scoreChange == -1) setScoreChange(s ? 1 : 0);
      // change/reset score value for display and database
      if(s){
        if(scoreChange == 0 || scoreChange == -1){
          setScore(immediateScore = initialScore+1);
          data.score = initialScore+1;
        }else{
          setScore(immediateScore = initialScore);
          data.score = initialScore;
        }
      }else{
        if(scoreChange == 0 || scoreChange == 1){
          setScore(immediateScore = initialScore-1);
          data.score = initialScore-1;
        }else{
          setScore(immediateScore = initialScore);
          data.score = initialScore;
        }
      }
      updateDatabaseScore(immediateScore);
    }
    else
    {
      toast('Log in or sign up to vote!');
    }
  }
  function updateDatabaseScore(immediateScore) {
    const pid = data.pid;
    const newScore = immediateScore;
    axios.post(backend + "/postscore/updatePostScore", {
      pid,
      newScore,
    })
  }
  function getShareLink() {
    navigator.clipboard.writeText(window.location.href + 'post/' + data.pid);
    toast("Post link copied to clipboard!");
  }
  const scoreHighlightUp = { color: 'Cyan', filter: 'drop-shadow(0 0 2px #000)' }
  const scoreHighlightDown = { color: 'Orange', filter: 'drop-shadow(0 0 2px #000)' }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link href={`/profile/${data.uid}`}>
          <a>
            <div className={styles.user}>
              <img className={styles.pic} src={pic} />
              <p className={styles.username}>@{data.username}</p>
            </div>
          </a>
        </Link>
        <div className={styles.interact}>
          <div className={styles.score}>
            <div className={styles.uparrow} title="Upvote" onClick={() => updateScore(true)}>
              <IoIosArrowUp style={scoreChange == 1 ? scoreHighlightUp : {}} size={'1.5em'} />
            </div>
            <p className={styles.scoreText}>{data.score}</p>
            <div className={styles.downarrow} title="Downvote" onClick={() => updateScore(false)}>
              <IoIosArrowDown style={scoreChange == -1 ? scoreHighlightDown : {}} size={'1.5em'} />
            </div>
          </div>
          <div className={styles.share} title="Share Post" onClick={() => getShareLink()}>
            <HiShare size={'2em'} />
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.head}>
          <Link href={`/post/${data.pid}`}>
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
          <Link href={`/post/${data.pid}`}>
            <a className={styles.readMore}>Read More</a>
          </Link>
        </div>
      </div>
    </div>
  );
}