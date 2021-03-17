import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useLocalStorage from '../../functions/useLocalStorage';
import styles from '../../styles/components/Navbar.module.css';
import ReactTooltip from 'react-tooltip';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { HiOutlineMail, HiOutlineUserGroup } from 'react-icons/hi';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';

export default function Searchbar() {
  const [auth, setAuth] = useLocalStorage('auth', { email: null, username: null, authkey: null });
  const loggedIn = auth.email != null;
  
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  // only render the tooltip after mount, to prevent errors
  useEffect(() => { setMounted(true); }, []);

  // for testing. comment out to test site as guest user
  /** 
  useEffect(() => {
    if (auth.email == null) {
      setAuth({ email: "test@test.com", username: "Tester", authkey: "abc123" });
      router.push('/')
        .then(() => router.reload());
    }
  }, []);
*/
  function logout() {
    setAuth({ email: null, username: null, authkey: null });
    router.push('/')
      .then(() => router.reload());
      // reload necessary to update Header (Logged in as). maybe find a better way in the future
  }

  return (
    <div className={styles.container}>
      { mounted
        ? <ReactTooltip place='right' offset={{ top: 0, left: -10 }} />
        : <></> }
      { loggedIn
      ? <>
        <Link href='/profile'>
          <div className={styles.circle} data-tip="Profile">
            <div className={styles.icon}>
              <AiOutlineUser size={'2.5em'} />
            </div>
          </div>
        </Link>
        <Link href='/newPost'>
          <div className={styles.circle} data-tip="New Post">
            <div className={styles.icon}>
              <BiMessageSquareAdd size={'2.5em'} />
            </div>
          </div>
        </Link>
        <Link href='/friends'>
          <div className={styles.circle} data-tip="Friends">
            <div className={styles.icon}>
              <HiOutlineUserGroup size={'2.5em'} color={'#ee8e67'} />
            </div>
          </div>
        </Link>
        <Link href='/messages'>
          <div className={styles.circle} data-tip="Messages">
            <div className={styles.icon}>
              <HiOutlineMail size={'2.5em'} />
            </div>
          </div>
        </Link>
          <div className={styles.circle} data-tip="Log Out" onClick={() => logout()}>
            <div className={styles.icon}>
              <FiLogOut size={'2.5em'} />
            </div>
          </div>
      </>
      : <>
        <Link href='/signup'>
          <div className={styles.circle} data-tip="Sign Up">
            <div className={styles.icon}>
              <AiOutlineUserAdd size={'2.5em'} />
            </div>
          </div>
        </Link>
        <Link href='/login'>
          <div className={styles.circle} data-tip="Log In">
            <div className={styles.icon}>
              <FiLogIn size={'2.5em'} />
            </div>
          </div>
        </Link>
      </> }
    </div>
  );
}
