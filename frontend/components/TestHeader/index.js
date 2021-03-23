import Link from 'next/link';
import useLocalStorage from '../../functions/useLocalStorage';
import { useRouter } from 'next/router';
import styles from '../../styles/components/TestHeader.module.css';

export default function TestHeader() {
  const [auth, setAuth] = useLocalStorage('auth', { email: null, uid: null, username: null, authkey: null });
  const router = useRouter();

  function logout() {
    setAuth({
      email: null,
      authkey: null,
    });
    router.push('/');
  }

  function fakeLogin() {
    setAuth({
      email: 'test@email.com',
      authkey: '9GJ43GHG923GJ427'
    });
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerL}>
          <p className={styles.logo}>MyBlogPost</p>
        </div>
        <div className={styles.headerR}>
          {auth.email != null ? (
            <p className={styles.email}>{auth.email}</p>
          ) : <></>}
          <Link href="/">
            <div className={styles.headerButton}>Home</div>
          </Link>
          {auth.email == null ? (
            <>
              <div role="button" tabIndex={0} className={styles.headerButton} onClick={() => fakeLogin()} onKeyDown={() => fakeLogin()}>
                Login
              </div>
              <Link href="/signup">
                <div className={styles.headerButton}>Sign Up</div>
              </Link>
            </>
          ) : (
            <>
              <div role="button" tabIndex={0} className={styles.headerButton} onClick={() => logout()} onKeyDown={() => logout()}>
                Logout
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
