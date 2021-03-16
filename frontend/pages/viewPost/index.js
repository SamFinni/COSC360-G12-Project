import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/ViewPostPage.module.css';
import Footer from '../../components/Footer';
import ViewPost from '../../components/ViewPost';
const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});

export default function ViewPostPage(props) {
  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <div className={styles.container}>
        <div className={styles.content}>
          {props.posts.map((post, idx) => (
            <ViewPost key={`post-${idx}`} data={post} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const posts = [
    {
      pid: 1647, title: "Blog Post Title",
      body: `	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Vestibulum sed arcu non odio euismod lacinia at quis risus. Vulputate dignissim suspendisse in est ante in. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. At erat pellentesque adipiscing commodo elit at. In nibh mauris cursus mattis. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Id nibh tortor id aliquet lectus. Enim nec dui nunc enim ut. Elementum facilisis leo vel fringilla est ullamcorper eget dui sapien eget mi proin. Faucibus purus in massa... `,
      score: 226, date: 'Sep. 23, 2020', uid: 132624, username: "KangaRupert", pic: "/pic1.png"
    }
  ];

  return {
    props: {
      posts
    }
  }
}