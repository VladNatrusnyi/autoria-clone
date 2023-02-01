import styles from './VinCode.module.css'
export const VinCode = ({value}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.vinCode}>
        <i className="bi bi-shield-check"
           style={{
             fontSize: 12,
             color: 'white'
           }}
        ></i>
      </div>
      <div className={styles.number}>{value}</div>
    </div>
  )
}