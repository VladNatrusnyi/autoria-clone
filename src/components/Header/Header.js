
import styles from './Header.module.css'
import {CustomLink} from "../UI/CustomLink";
import {Button} from "antd";
import {SearchOutlined} from "@ant-design/icons";
export const Header = () => {
  return (
    <div className={styles.header_wrapper}>
      <CustomLink to={'/'}>
        <img className={styles.header_img} src={require('../../assets/img/race-car-309123_1280.jpg')} alt="Logo"/>
      </CustomLink>
    </div>
  )
}
