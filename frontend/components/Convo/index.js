import React, { useState, useEffect } from 'react';
import useInterval from '../../functions/useInterval';
import axios from 'axios';
import update from 'immutability-helper';
import useLocalStorage from '../../functions/useLocalStorage';
import styles from '../../styles/components/Convo.module.css';
import UserMessage from '../../components/UserMessage';
import { MdAddCircleOutline } from 'react-icons/md';
import * as cfg from '../../config';
const backend = 'https://' + cfg.BACKEND_IP + ':' + cfg.BACKEND_PORT;

export default function MessagesPage() {
  const [auth, ] = useLocalStorage('auth', { email: null, uid: null, username: null, authkey: null });
  const [data, setData] = useState([]);
  const [convo, setConvo] = useState({});
  const [sendMsg, setSendMsg] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const pollTime = 1000;

  // scroll last message of convo into view
  const convoRef = React.createRef();
  useEffect(() => { if (convo && convoRef.current) convoRef.current.scrollIntoView({ behavior: 'smooth' }) }, [convo])

  async function getConvos() {
    const messages = await axios.post(backend + '/message/list', {
      uid: auth.uid
    });

    setData(messages.data.list);
  }
  useEffect(getConvos, [auth]);
  
  async function pollGetConvos() {
    const messages = await axios.post(backend + '/message/list', {
      uid: auth.uid
    });

    await setData(messages.data.list);
    selection(convo.uid);
  }
  useInterval(async () => {
    if (!auth.uid) return;
    pollGetConvos();
  }, pollTime);
  
  let convoElement = <></>;
  if (!convo || Object.keys(convo).length === 0) convoElement = (
    <div className={styles.choose}>
      <p>Choose something on the left first!</p>
    </div>
  );
  else if (convo.new) convoElement = (
    <div className={styles.new} ref={convoRef}>
      <p className={styles.searchText}>Search for a user to message</p>
      <input type="text" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} className={styles.search} />
      <button className={styles.go} onClick={startConvo}>Go</button>
    </div>
  );
  else convoElement = (
    <div className={styles.convoContainer}>
      <div className={styles.convo} ref={convo.messages.length == 0 ? convoRef : null}>
        {convo.messages.length == 0 ? <p>Start the conversation!</p> : null}
        {convo.messages.map((message, idx) => {
          const r = idx == convo.messages.length-1 ?  convoRef : null;
          const dt = new Date(message.createdAt);
          if (message.sender == 0) return (
            <div key={`convo-${idx}`} className={`${styles.bothMsg} ${styles.fromMsg}`} ref={r}>
              {message.text}
              <p className={styles.date}>{dt.toLocaleString()}</p>
            </div>
            );
          else return (
            <div key={`convo-${idx}`} className={`${styles.bothMsg} ${styles.toMsg}`} ref={r}>
              {message.text}
              <p className={styles.date}>{dt.toLocaleString()}</p>
            </div>
            );
        })}
      </div>
      <div className={styles.send}>
        <button className={styles.sendButton} onClick={sendMessage}>Send</button>
        <textarea className={styles.sendText} value={sendMsg} onChange={(e) => setSendMsg(e.target.value)} onKeyDown={(e) => { if (e.key == 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} />
      </div>
    </div>
  );

  function selection(uid) {
    if (uid === -1) setConvo({ new: true });
    else setConvo(data.filter(message => message.uid === uid)[0]);
  }

  function sendMessage() {
    const msg = sendMsg.trim();
    if (msg == '') return;

    axios.post(backend + '/message/send', {
      fromUid: auth.uid,
      toUid: convo.uid,
      text: msg,
    });

    let temp = convo.messages;
    temp.push({ from: false, text: msg });
    setConvo({ ...convo, messages: temp });
    setSendMsg('');
  }

  function startConvo() {
    // todo: get actual uid & image. also add logic to update a dropdown list of existing users under search input
    temp = update(data, {$push: [{ uid: 1, username: searchUser, image: null, messages: [] }]});
    setData(temp);
    setConvo(temp.messages[temp.messages.length-1]);
    setSearchUser('');
  }

  return (
    <div className={styles.messages}>
      <div className={styles.list}>
        {data.length > 0
          ? data.map((message, idx) => (
            <UserMessage onClick={() => selection(message.uid)} key={`message-${idx}`} data={message} selected={convo && convo.uid === message.uid} />
          ))
          : null
        }
        <div className={`${styles.newMessage} ${convo && convo.new ? styles.selected : null}`} onClick={() => selection(-1)}>
          <div className={styles.icon}>
            <MdAddCircleOutline size={'32px'} />
          </div>
        </div>
      </div>
      {convoElement}
    </div>
  )
}
