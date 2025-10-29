import spinner from '../../assets/icons/spinners/default.gif';
import styles from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.spinnerMask}>
      <img src={spinner} width="100"/>
    </div>
  )
}
