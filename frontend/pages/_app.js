import '../styles/globals.css'
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Blogaru({ Component, pageProps }) {
  return (
  <>
    <Head>
      <title>MyBlogPost</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ToastContainer />

    <Component {...pageProps} />
  </>
  );
}
