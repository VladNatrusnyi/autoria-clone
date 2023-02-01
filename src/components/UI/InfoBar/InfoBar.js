import styles from './InfoBar.module.css'
export const InfoBar = ({value}) => {
  return (
    <div className={styles.wrapper}>{value}</div>
  )
}