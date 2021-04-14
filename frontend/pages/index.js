{/*
  INCOMPLETE

  FEATURES:
    View top posts by score and date

*/}

import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../styles/pages/HomePage.module.css';
import Footer from '../components/Footer';
import PostPreview from '../components/PostPreview';
import axios from 'axios';
import { useEffect, useState } from "react";
import * as cfg from '../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;
const Header = dynamic(() => import('../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../components/Navbar'), {
  ssr: false
});

export default function HomePage() {

  // structure of a post in posts:
  // post { pid, title, body, tags, createdAt, uid, username, image, score }
  const [posts, setPosts] = useState([]); // Currently displayed posts

  // Get top posts and setPosts to top posts
  async function getPosts() {
    await axios.post(backend + '/post/listTop').then(data => setPosts(data.data));
  }
  useEffect(() => {
    getPosts();
  }, []);
  
  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Navbar />

      <div className={styles.container}>
        <div className={styles.postlist}>
          
          {posts.map((post, idx) => (
            <PostPreview key={`postpreview-${idx}`} data={post} />
          ))}
          
        </div>
      </div>

      <Footer />
    </div>
  )
}