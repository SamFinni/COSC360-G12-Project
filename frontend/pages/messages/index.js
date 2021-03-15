import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../../styles/pages/MessagesPage.module.css';
import Footer from '../../components/Footer';
import UserMessage from '../../components/UserMessage';
import { MdAddCircleOutline } from 'react-icons/md';
const Header = dynamic(() => import('../../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
});

export default function MessagesPage(props) {
  const [convo, setConvo] = useState();
  const [sendMsg, setSendMsg] = useState('');
  const [searchUser, setSearchUser] = useState('');

  const convoRef = React.createRef();
  useEffect(() => { if (convo) convoRef.current.scrollIntoView({ behavior: 'smooth' }) }, [convo])

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
          if (message.from) return (
            <div key={`convo-${idx}`} className={`${styles.bothMsg} ${styles.fromMsg}`} ref={r}>
              {message.text}
            </div>
            );
          else return (
            <div key={`convo-${idx}`} className={`${styles.bothMsg} ${styles.toMsg}`} ref={r}>
              {message.text}
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
    else setConvo(props.messages.filter(message => message.uid === uid)[0]);
  }

  function sendMessage() {
    const msg = sendMsg.trim();
    if (msg == '') return;

    // todo
    console.log("Send the message!", msg);

    let temp = convo.messages;
    temp.push({ from: false, text: msg });
    setConvo({ ...convo, messages: temp });
    setSendMsg('');
  }

  function startConvo() {
    // todo: get actual uid & pic. also add logic to update a dropdown list of existing users under search input
    props.messages.push({ uid: props.messages.length, username: searchUser, pic: '', messages: [] });
    setConvo(props.messages[props.messages.length-1]);
    setSearchUser('');
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru - Messages</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <div className={styles.container}>
        <h1 className={styles.title}>Messages</h1>
        <div className={styles.messages}>
          <div className={styles.list}>
            {props.messages.map((message, idx) => (
              <UserMessage onClick={() => selection(message.uid)} key={`message-${idx}`} data={message} selected={convo && convo.uid === message.uid} />
            ))}
            <div className={`${styles.newMessage} ${convo && convo.new ? styles.selected : null}`} onClick={() => selection(-1)}>
              <div className={styles.icon}>
                <MdAddCircleOutline size={'32px'} />
              </div>
            </div>
          </div>
          {convoElement}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const messages = [
    { uid: 132624, username: 'KangaRupert', pic: '/pic1.png', messages: [
      { from: true, text: 'Hey!' },
      { from: false, text: 'How\'s it going?' },
      { from: true, text: 'I\'m doing pretty good' },
      { from: false, text: 'Nice. This is a really really really really long message. See you later!' }
    ] },
    { uid: 458543, username: 'HenryHops', pic: '/pic2.png', messages: [
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
      { from: true, text: 'Ay!' },
      { from: false, text: 'How you doin?' },
      { from: true, text: 'Just chillin' },
      { from: false, text: 'Right on' },
    ] },
  ];

  return {
    props: {
      messages
    }
  }
}