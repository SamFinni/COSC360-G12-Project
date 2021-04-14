import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/SearchPage.module.css';
import sbStyles from '../../styles/components/PageSearchbar.module.css';
import Footer from '../../components/Footer';
import PostPreview from '../../components/PostPreview';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import * as cfg from '../../config';
const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const resultsClass = `${styles.results} ${styles.hidden}`;

  function submit() {
    if (query == '') return;
    axios.post(backend + "/post/search", {
      query
    }).then(response => {
      if (response.data.length === 0) {
        document.getElementById("error-message").classList.remove(`${styles.hidden}`);
      }else{
        document.getElementById("error-message").classList.add(`${styles.hidden}`);
      }
      var resultsContainer = document.getElementById("search-results");
      if (resultsContainer.classList.contains(`${styles.hidden}`)) {
        resultsContainer.classList.remove(`${styles.hidden}`);
      }
      setPosts(response.data);
    });
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru - Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <div className={styles.container}>
          <h1 className={styles.title}>Search</h1>
          <div className={styles.content}>
              <div className={styles.searchbar}>
                <div className={sbStyles.container}>
                  <div className={sbStyles.searchButton} onClick={submit}>
                    <div className={sbStyles.icon}>
                      <BiSearch size={'32px'} />
                    </div>
                  </div>
                  <div className={sbStyles.textBar}>
                    <input
                      className={sbStyles.textInput}
                      type="text"
                      placeholder="Search for posts..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key == 'Enter' ? submit() : null}
                      spellCheck={false}
                    />
                  </div>
                </div>
              </div>
          </div>
          <div className={resultsClass} id="search-results">
            <h2>Results</h2>
              <div id="results">
                {posts.map((post, index) => (
                  <PostPreview key={`postpreview-${index}`} data={post} />
                ))}
              </div>
              <p className={styles.hidden} id="error-message">We couldn't find a match for you search. Please try another search.</p>
          </div>
      </div>

      <Footer />
    </div>
  )
}