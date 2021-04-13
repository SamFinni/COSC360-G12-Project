import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/NewPostPage.module.css';
import Footer from '../../components/Footer';
import Link from 'next/link';
import axios from 'axios';
import useLocalStorage from '../../functions/useLocalStorage';
import * as cfg from '../../config';
import { useState } from 'react';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

const Header = dynamic(() => import('../../components/Header'), {
    ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
    ssr: false
});

export default function NewPostPage() {
    const [auth, ] = useLocalStorage('auth', { email: null, uid: null, username: null, authkey: null });
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [postId, setPostId] = useState('');

    const errorClass = `${styles.errorMessage} ${styles.hidden}`;
    
    function createPost(e) {
        const title = postTitle.trim();
        const body = postBody.trim();
        
        // if title and body are empty - display error message and block submission
        if (title == '' || body == '') {
            var errorMessage = document.getElementById("error-message");
            errorMessage.classList.remove(`${styles.hidden}`);
            e.preventDefault();
            return;
        }

        // add new post
        axios.post(backend + '/post/add', {
            uid: auth.uid,
            title: title,
            body: body,
            tags: null
        }).then(response => {setPostId(response.data[0])});
        setPostTitle('');
        setPostBody('');
    }
    
    return (
        <div className={styles.page}>
            <Head>
                <title>Blogaru - Create Post</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <Navbar />

            <div className={styles.container}>
                <h1 className={styles.title}>Create a new post</h1>
                <div className={styles.content}>
                    <div className={styles.inputHolder}>
                        <label>
                            Title:
                            <input type="text" name="titlePost" className={styles.titleInput} value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                        </label>
                        <textarea name="bodyPost" className={styles.bodyInput} value={postBody} onChange={(e) => setPostBody(e.target.value)}></textarea>
                    </div>
                    <div className={styles.submitSection}>
                        <span className={errorClass} id="error-message">The post must have both a title and body.</span>
                        <Link href={`/viewPost/${postId}`}>
                            <a className={styles.postButton} onClick={createPost}>Create Post</a>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}