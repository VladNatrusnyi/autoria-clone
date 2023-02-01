import styles from './CarNumber.module.css'
export const CarNumber = ({value}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.countryCode}>
        <img src={require('./../../../assets/img/ukraine-flag.png')} alt="flag"/>
        <div>UA</div>
      </div>
      <div className={styles.number}>{value}</div>
    </div>
  )
}