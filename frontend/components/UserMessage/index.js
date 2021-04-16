import styles from '../../styles/components/UserMessage.module.css';

export default function UserMessage({ data, selected, onClick }) {
  const imgSource = data.image ? data.image : '/user.png';
  return (
    <div className={`${styles.container} ${selected ? styles.selected : null}`} onClick={onClick}>
      <img className={styles.pic} src={imgSource} />
      <p className={styles.username}>@{data.username}</p>
    </div>
  );
}