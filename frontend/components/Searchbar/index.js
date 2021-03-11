import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/Searchbar.module.css';
import { BiSearch } from 'react-icons/bi';

export default function Searchbar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function submit() {
    if (query == '') return;
    router.push('/search/' + query);
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchButton} onClick={submit}>
        <div className={styles.icon}>
          <BiSearch size={'32px'} />
        </div>
      </div>
      <div className={styles.textBar}>
        <input
          className={styles.textInput}
          type="text"
          placeholder="Search for posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key == 'Enter' ? submit() : null}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
