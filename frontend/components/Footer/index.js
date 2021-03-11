import Link from 'next/link';
import styles from '../../styles/components/Footer.module.css';

export default function Header() {
  return (
    <>
      <div className={styles.container}>
        <Link href="/pp">
          <a>Privacy Policy</a>
        </Link>
        <Link href="/tos">
          <a>Terms of Service</a>
        </Link>
        <Link href="/contact">
          <a>Contact Us</a>
        </Link>
      </div>
    </>
  );
}
