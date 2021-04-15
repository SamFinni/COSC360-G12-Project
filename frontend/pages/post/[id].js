import Head from 'next/head';
import dynamic from "next/dynamic";
import Footer from '../../components/Footer';

import Link from 'next/link';
import styles from '../../styles/pages/ViewPostPage.module.css'; // note: update CSS file names later to 'post'
// import styles from '../../styles/components/ViewPost.module.css';
import { useEffect, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { HiShare } from 'react-icons/hi';
import { useRouter } from 'next/router';
import axios from 'axios';
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

    const router = useRouter();
    var postId = parseInt(router.query.id);
    console.log(postId);

   
    
    async function getPost() {
        console.log(router.query.id);
        await axios.post(backend + '/post/getPost', {
            id: parseInt(router.query.id)
        }).then(response => {
            setPost(response.data[0]);
            console.log(response.data);
        });
    }
    
    useEffect(() => {
        getPost();
    }, [postId]);
    console.log(post);


    if (!post) {
        return <></>;
    }
    return (
        <div className={styles.page}>
            <Head>
                <title>Blogaru - View Post</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <Navbar />

            <div className={styles.container}>
                <div className={styles.content}>
                    <p>pid: {post.pid}</p>
                    <p>title: {post.title}</p>
                    <p>body: {post.body}</p>
                    <p>date: {post.createdAt}</p>
                    <p>uid: {post.uid}</p>
                    <p>username: {post.username}</p>
                    <p>score: {post.score}</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}