import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/SearchPage.module.css';
import Footer from '../../components/Footer';
import Searchbar from '../../components/PageSearchbar';
const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});

export default function SearchPage() {
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
                <Searchbar />
              </div>
              <div className={styles.results}>

              </div>
          </div>
      </div>

      <Footer />
    </div>
  )
}