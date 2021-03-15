import styles from '../../styles/components/UserMessage.module.css';

export default function UserMessage({ data, selected, onClick }) {
  return (
    <div className={`${styles.container} ${selected ? styles.selected : null}`} onClick={onClick}>
      <img className={styles.pic} src={data.pic} />
      <p className={styles.username}>@{data.username}</p>
    </div>
  );
}