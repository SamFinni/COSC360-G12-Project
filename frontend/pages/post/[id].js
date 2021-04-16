import Head from "next/head";
import dynamic from "next/dynamic";
import Footer from "../../components/Footer";
import Comment from "../../components/Comment";
import Link from "next/link";
import styles from "../../styles/pages/PostPage.module.css";
import { useEffect, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import {
  HiDocumentRemove,
  HiDocumentReport,
  HiShare,
  HiExclamation,
} from "react-icons/hi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import useLocalStorage from "../../functions/useLocalStorage";
import * as cfg from "../../config";

const backend = "http://" + cfg.BACKEND_IP + ":" + cfg.BACKEND_PORT;

const Header = dynamic(() => import("../../components/Header"), {
  ssr: false,
});
const Navbar = dynamic(() => import("../../components/Navbar"), {
  ssr: false,
});

export default function Post() {
  const [post, setPost] = useState([]);
  const [scoreChange, setScoreChange] = useState(0); // the change in score when voting
  const [score, setScore] = useState(0); // the score of the post considering votes
  const [initialScore, setInitialScore] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [pic, setPic] = useState("");
  const [auth, setAuth] = useLocalStorage('auth', { email: null, uid: null, username: null, authkey: null });
  const [userAdmin, setUserAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return <></>;
    getPost();
  }, [router.isReady]);

  async function getPost() {
    await axios
      .post(backend + "/post/getPost", {
        id: parseInt(router.query.id),
      })
      .then((response) => {
        setPost(response.data[0]);
        getUserData(response.data[0].uid);
        initializeScore(response.data[0].score);
        getComments(response.data[0].pid);
        checkUserSignedIn(auth.uid);
      });
  }

  async function getUserData(id) {
    const userData = await axios.post(backend + "/user/getUser", {
      uid: id,
    });
    setPic(userData.data[0].image);
    getThisUserAdmin();
  }

  async function getComments(postId) {
    await axios
      .post(backend + "/comment/list", {
        id: postId,
      })
      .then((response) => setComments(response.data));
  }

  async function initializeScore(postScore) {
    setScore(postScore);
    setInitialScore(postScore);
  }

  function checkUserSignedIn(currentUserId) {
    if (currentUserId != null) setUser(true);
    else setUser(false);
  }

  function updateScore(s) {
    if (user) {
      var immediateScore = post.score;
      // change/reset scoreChange arrows
      if (scoreChange == 0) setScoreChange(s ? 1 : -1);
      else if (scoreChange == 1) setScoreChange(s ? 0 : -1);
      else if (scoreChange == -1) setScoreChange(s ? 1 : 0);
      // change/reset score value for display and database
      if (s) {
        if (scoreChange == 0 || scoreChange == -1)
          setScore((immediateScore = initialScore + 1));
        else setScore((immediateScore = initialScore));
      } else {
        if (scoreChange == 0 || scoreChange == 1)
          setScore((immediateScore = initialScore - 1));
        else setScore((immediateScore = initialScore));
      }
      updateDatabaseScore(immediateScore);
    } else {
      toast("Log in or sign up to vote!");
    }
  }

  function updateDatabaseScore(immediateScore) {
    const pid = post.pid;
    const newScore = immediateScore;
    axios.post(backend + "/postscore/updatePostScore", {
      pid,
      newScore,
    });
  }

  function getShareLink() {
    navigator.clipboard.writeText(window.location.href);
    toast("Post link copied to clipboard!");
  }
  const scoreHighlightUp = {
    color: "Cyan",
    filter: "drop-shadow(0 0 2px #000)",
  };
  const scoreHighlightDown = {
    color: "Orange",
    filter: "drop-shadow(0 0 2px #000)",
  };

  function addComment(e) {
    const body = commentBody.trim();
    if (body == "") {
      e.preventDefault();
      return;
    }

    axios.post(backend + "/comment/add", {
      pid: post.pid,
      uid: auth.uid,
      body: body,
    });
    getComments(post.pid);
    setCommentBody("");
  }

  // Auth: check if user is an admin
  function getThisUserAdmin() {
    var uid = auth.uid;
    if (!uid) return;

    axios
      .post(backend + "/user/status", {
        uid,
      })
      .then((data) => authenticate(data.data[0].admin));
  }
  function authenticate(admin) {
    setUserAdmin(admin);
  }
  // Remove post
  function removePost() {
    if (confirm("Are you sure you wish to delete this post?")) {
      // delete post
      const id = post.pid;
      axios.post(backend + "/post/remove", {
        id,
      });
      // force redirect
      window.location.replace("http://" + cfg.FRONTEND_IP + ":" + cfg.FRONTEND_PORT);
    }
  }

  function reportPost() {
    var reason;
    if(reason = prompt("Please give a reason for your report:")){
        // report post
        axios.post(backend + "/postreport/insert", {
        pid: post.pid,
        uid: auth.uid,
        reason: reason,
        });
        toast("Report submitted");
    }
    else
    {
        toast("Report cancelled");
    }
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru - View Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <div className={styles.holder}>
        <Link href="/">
          <div className={styles.button} >Back</div>
        </Link>
        <div className={styles.content}>
          <span className={styles.date}>
            {!post.createdAt ? "" : post.createdAt.substring(0, 10)}
          </span>
          <div className={styles.user}>
            <Link href={`/viewprofile/` + post.uid}>
              <img className={styles.pic} src={pic} />
            </Link>
            <Link href={`/viewprofile/` + post.uid}>
              <p className={styles.username}>@{post.username}</p>
            </Link>
          </div>
          <div>
            <h2 className={styles.title}>{post.title}</h2>
            <div className={styles.bodyContainer}>
              <p className={styles.body}>{post.body}</p>
            </div>
          </div>
          <div className={styles.interact}>
            <div className={styles.score}>
              <div className={styles.uparrow} title="Upvote" onClick={() => updateScore(true)}>
                <IoIosArrowUp
                  style={scoreChange == 1 ? scoreHighlightUp : {}}
                  size={"2em"}
                />
              </div>
              <p className={styles.scoreText}>{score}</p>
              <div
                className={styles.downarrow}
                title="Downvote"
                onClick={() => updateScore(false)}
              >
                <IoIosArrowDown
                  style={scoreChange == -1 ? scoreHighlightDown : {}}
                  size={"2em"}
                />
              </div>
            </div>
            <div className={styles.share} title="Share Post" onClick={() => getShareLink()}>
              <HiShare size={"3em"} />
            </div>
            <div className={styles.report} title="Report Post" onClick={() => reportPost()}>
              <HiExclamation size={"3em"} />
            </div>
          </div>
        </div>
        <div className={styles.commentContent}>
          <h3 className={styles.commentHeader}>Comments</h3>
          <div>
            {comments.length ? (
              <div className={styles.commentList}>
                {comments.map((comment, idx) => (
                  <Comment key={`comment-${idx}`} data={comment} />
                ))}
              </div>
            ) : (
              <p>
                There are no comments on this post. Be the first to add one!
              </p>
            )}
          </div>
          {user ? (
            <div className={styles.addComment}>
              <textarea
                name="commentBody"
                className={styles.commentInput}
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
              ></textarea>
              <div className={styles.addButtonHolder}>
                <div className={styles.addCommentButton} onClick={addComment}>
                  Add a comment
                </div>
              </div>
            </div>
          ) : (
            <p>Sign up to leave a comment!</p>
          )}
        </div>
      </div>
      <Footer />
      {/* ADMIN */}
      {userAdmin == 1 && (
        <fieldset className={styles.admincontainer}>
          <legend className={styles.admintitle}>Admin Control</legend>
          <button
            className={styles.adminbutton} // Toggle button for disabled value
            onClick={() => removePost()}
            name="remove"
          >
            <span>Remove Post</span>
          </button>
        </fieldset>
      )}
      {/* ADMIN */}
    </div>
  );
}
