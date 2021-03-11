import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Header from '../../components/TestHeader';
import styles from '../../styles/pages/TestPage.module.css';
import * as cfg from '../../config';

export default function TestPage() {
  const [data, setData] = useState([]); // initialize to empty array
  const [clicked, setClicked] = useState(0); // initialize to 0
  const [error, setError] = useState(''); // initialize to ''

  const backend = 'http://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

  // calls select api, then updates `data` state
  async function selectAPI() {
    await axios.post(backend + '/test/select', {
      blogID: 2632 // sample POST body, not used for anything here
    })
    .then((res) => {
      setData(JSON.stringify(res.data, null, 2)); // update our data state
      if (error != '') setError(''); // reset the error state
    })
    .catch((err) => setError("Table doesn't exist! Try using `Create Table` first."));
  }

  async function handleAPI(type) {
    setClicked(clicked + 1);

    if (type != 'select' && type != 'drop')
      await axios.post(backend + '/test/' + type)
      .then(() => selectAPI())
      .catch((err) => setError("Table doesn't exist! Try using `Create Table` first."));
    else if (type == 'drop') {
      setData([]);
      axios.post(backend + '/test/' + type)
      .catch((err) => setError("Table doesn't exist! Try using `Create Table` first."));
    } else selectAPI();
  }

  useEffect(() => console.log("Called once on first load"), []);

  useEffect(() => console.log("Called every time `clicked` state variable is updated"), [clicked]);

  useEffect(() => console.log("Called every time `data` OR `error` state variables are updated"), [data, error]);

  let errorDiv = <></>;
  if (error !== '') {
    errorDiv = (
      <pre className={styles.error}>
        <b>{error}</b>
      </pre>
    );
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>MyBlogPost - API Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className={styles.card}>
        <h1>API Test</h1>

        <div className={styles.apiForm}>
          <p style={{ fontStyle: 'italic' }}>
            Note: 'Select' will be automatically run after any button is pressed,
            to show the updated data
            <br />
            This test uses pre-defined queries, which can be viewed in backend/routes/test.js
          </p>
          <div className={styles.apiButtonContainer}>
            <div
              className={styles.apiButton}
              role="button"
              tabIndex={0}
              onClick={() => handleAPI('select')}
              onKeyDown={() => handleAPI('select')}
            >
              Select
            </div>
            <div
              className={styles.apiButton}
              role="button"
              tabIndex={1}
              onClick={() => handleAPI('insert')}
              onKeyDown={() => handleAPI('insert')}
            >
              Insert
            </div>
            <div
              className={styles.apiButton}
              role="button"
              tabIndex={2}
              onClick={() => handleAPI('update')}
              onKeyDown={() => handleAPI('update')}
            >
              Update
            </div>
            <div
              className={styles.apiButton}
              role="button"
              tabIndex={3}
              onClick={() => handleAPI('delete')}
              onKeyDown={() => handleAPI('delete')}
            >
              Delete
            </div>
            <div
              className={styles.apiButton}
              role="button"
              tabIndex={4}
              onClick={() => handleAPI('create')}
              onKeyDown={() => handleAPI('create')}
            >
              Create Table
            </div>
            <div
              className={styles.apiButton}
              role="button"
              tabIndex={5}
              onClick={() => handleAPI('drop')}
              onKeyDown={() => handleAPI('drop')}
            >
              Drop Table
            </div>
          </div>
          {errorDiv}
          <br />
          <textarea className={styles.apiTextarea} value={data} readOnly />
          <p># of button presses: <b>{clicked}</b></p>
        </div>
      </div>
    </div>
  );
}
