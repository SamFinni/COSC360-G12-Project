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
import ClipLoader from "react-spinners/ClipLoader";
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
  function getTopPosts() {
    axios.post(backend + '/post/listTop').then(data => setPosts(data.data));
  }
  // Get worst posts and setPosts to worst posts
  function getWorstPosts() {
    axios.post(backend + '/post/listWorst').then(data => setPosts(data.data));
  }
  // Get all posts and setPosts to all posts
  function getAllPosts() {
    axios.post(backend + '/post/listAll').then(data => setPosts(data.data));
  }
  // Get date ordered posts and setPosts to date ordered posts
  function getDatePosts() {
    axios.post(backend + '/post/listByDate').then(data => setPosts(data.data));
  }
  useEffect(() => {
    getDatePosts();
  }, []);
  
  function handleSortSubmit(event) {
    event.preventDefault();
    if(event.target.value == 'worst'){      // sort by worst
      getWorstPosts();
    }else if(event.target.value == 'all'){  // sort by all
      getAllPosts();
    }else if(event.target.value == 'best'){ // sort by best
      getTopPosts();
    }else{                                  // sort by date (default)
      getDatePosts();
    }
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Navbar />

      <div className={styles.topcontainer}>
        <div className={styles.form}>
          <span className={styles.subtitle}>Sort by:&nbsp;
          <select name="sort" className={styles.select} onChange={handleSortSubmit}>
          <option value="date" defaultValue="selected">Date</option>
            <option value="best">Best</option>
            <option value="worst">Worst</option>
            <option value="all">All</option>
          </select>
          </span>
        </div>
        <span className={styles.count}>{posts.length > 0 ? posts.length : 'Loading'}</span><span className={styles.count2}>&nbsp;Posts</span>
      </div>

      <div className={styles.container} style={posts.length == 0 ? { padding: '2em' } : null}>
        <div className={styles.postlist}>
          
          {posts.length > 0
          ? posts.map((post, idx) => (
            <PostPreview key={`postpreview-${idx}`} data={post} />
          ))
          : <ClipLoader color={'#ee8e67'} loading={true} size={200} />
          }
          
        </div>
      </div>

      <Footer />
    </div>
  )
}