import Link from 'next/link';
import useLocalStorage from '../../functions/useLocalStorage';
import styles from '../../styles/components/Header.module.css';
import Searchbar from '../Searchbar';

export default function Header() {
  const [auth, ] = useLocalStorage('auth', { email: null, uid: null, username: null, authkey: null });

  return (
    <>
      <div className={styles.container}>
        { auth.email != null ? <p className={styles.name}>Logged in as: <Link href='/profile'><a><b>@{auth.username}</b></a></Link></p> : <></> }
        <Link href="/">
          <a><img className={styles.logo} src="./logo.png" /></a>
        </Link>
        <Searchbar />
      </div>
    </>
  );
}
