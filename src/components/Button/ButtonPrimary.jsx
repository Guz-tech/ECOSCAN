
import styles from './ButtonPrimary.module.css';

function ButtonPrimary({ children, onClick }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
}

export default ButtonPrimary;