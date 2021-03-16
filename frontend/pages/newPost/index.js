import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/NewPostPage.module.css';
import Footer from '../../components/Footer';
import Link from 'next/link';
const Header = dynamic(() => import('../../components/Header'), {
    ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
    ssr: false
});

export default function NewPostPage() {
    return (
        <div className={styles.page}>
            <Head>
                <title>Blogaru</title>
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
                            <input type="text" name="titlePost" className={styles.titleInput} />
                        </label>
                        <textarea name="bodyPost" className={styles.bodyInput}></textarea>
                    </div>
                    <div>
                        <Link href={`/success`}>
                            <a className={styles.postButton}>Create Post</a>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}