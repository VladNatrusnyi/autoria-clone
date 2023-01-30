
import styles from './Header.module.css'
export const Header = () => {
  return (
    <div className={styles.header_wrapper}>
      <img className={styles.header_img} src={require('../../assets/img/race-car-309123_1280.jpg')} alt="Logo"/>
    </div>
  )
}
