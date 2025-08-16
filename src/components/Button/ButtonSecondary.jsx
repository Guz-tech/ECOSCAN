
import styles from './ButtonSecondary.module.css';

function ButtonSecondary({ children, onClick }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
}

export default ButtonSecondary;