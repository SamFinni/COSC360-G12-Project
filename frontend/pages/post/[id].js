import Head from 'next/head';
import dynamic from "next/dynamic";
import Footer from '../../components/Footer';
import Link from 'next/link';
import styles from '../../styles/pages/PostPage.module.css';
import { useEffect, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { HiShare } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';
import useLocalStorage from '../../functions/useLocalStorage';
import * as cfg from '../../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});

export default function Post() {
    const [post, setPost] = useState([]);
    const [scoreChange, setScoreChange] = useState(0); // the change in score when voting
    const [score, setScore] = useState(0); // the score of the post considering votes
    const [initialScore, setInitialScore] = useState(0);
    const [pic, setPic] = useState("");
    const [auth, setAuth] = useLocalStorage('auth');  // auth info: { email, uid, username, authkey }
    const [userAdmin, setUserAdmin] = useState(false);

    const router = useRouter();
    var signedIn = false;
    
    useEffect(() => {
        if(!router.isReady) return <></>;
        getPost();
    }, [router.isReady]);

    async function getPost() {
        console.log(router.query.id);
        await axios.post(backend + '/post/getPost', {
            id: parseInt(router.query.id)
        }).then(response => {
            setPost(response.data[0]);
            getUserData(response.data[0].uid);
            checkUserSignedIn();
            initializeScore(response.data[0].score);
        });
    }
    
    async function getUserData(id) {
        const userData = await axios.post(backend + "/user/getUser", {
          uid: id
        });
        setPic(userData.data[0].image);
        getThisUserAdmin();
    }

    function checkUserSignedIn() {
        if (auth.uid != null) signedIn = true;
        else signedIn = false;
    }

    async function initializeScore(postScore) {
        setScore(postScore);
        setInitialScore(postScore);
    }

    function updateScore(s) {
        if (signedIn) {
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
    function getShareLink() {
        navigator.clipboard.writeText(window.location.href + 'post/' + post.pid);
        toast("Post link copied to clipboard!");
    }
    const scoreHighlightUp = { color: 'Cyan', filter: 'drop-shadow(0 0 2px #000)' }
    const scoreHighlightDown = { color: 'Orange', filter: 'drop-shadow(0 0 2px #000)' }

    function addComment() {
        alert("Post comment.");
    }

    
    // Auth: check if user is an admin
    function getThisUserAdmin(){
        var uid = auth.uid;
        if (!uid) return;
        
        axios.post(backend + '/user/status', {
          uid,
        }).then(data => authenticate(data.data[0].admin));
    }
    function authenticate(admin){
        setUserAdmin(admin);
    }
    // Remove post
    function removePost() {
        if(confirm("Are you sure you wish to delete this post?"))
        {
        // delete post
        const id = post.pid;
        axios.post(backend + "/post/remove", {
            id,
        });
        // force redirect
        window.location.replace("http://localhost:3000/");
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
                <div className={styles.content}>
                    <span className={styles.date}>{ !post.createdAt ? '' : post.createdAt.substring(0,10)}</span>
                    <div className={styles.user}>
                        <Link href={`/user/`+post.uid}><img className={styles.pic} src={ pic } /></Link>
                        <Link href={`/user/`+post.uid}><p className={styles.username}>@{post.username}</p></Link>
                    </div>
                    <div>
                        <h2 className={styles.title}>{post.title}</h2>
                        <div className={styles.bodyContainer}>
                            <p className={styles.body}>{post.body}</p>
                        </div>
                    </div>
                    <div className={styles.interact}>
                        <div className={styles.score}>
                            <div className={styles.uparrow} onClick={() => updateScore(true)}>
                                <IoIosArrowUp style={scoreChange == 1 ? scoreHighlightUp : {}} size={'2em'} />
                            </div>
                            <p className={styles.scoreText}>{score}</p>
                            <div className={styles.downarrow} onClick={() => updateScore(false)}>
                                <IoIosArrowDown style={scoreChange == -1 ? scoreHighlightDown : {}} size={'2em'} />
                            </div>
                        </div>
                        <div className={styles.share} onClick={() => getShareLink()}>
                            <HiShare size={'3em'} />
                        </div>
                    </div>
                </div>
                <div className={styles.commentContent}>
                    <h3 className={styles.commentHeader}>Comments</h3>

                    {/* WIP */}
                    <div className={styles.addComment}>
                        <textarea className={styles.commentInput} id="commentInput" refs="newCommentInput"></textarea>
                        <a className={styles.addCommentButton} onClick={() => addComment()}>Add a comment</a>
                    </div>
                </div>
            </div>
            <Footer />
            {/* ADMIN */}
            {userAdmin == 1 &&
                <fieldset className={styles.admincontainer}>
                    <legend className={styles.admintitle}>Admin Control</legend>
                    <button className={styles.adminbutton} // Toggle button for disabled value
                        onClick={()=> removePost()}
                        name="remove" 
                    ><span>Remove Post</span></button>
                </fieldset>
            }
            {/* ADMIN */}
        </div>
    )
}