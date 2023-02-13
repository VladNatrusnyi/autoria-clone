import styles from './Header.module.css'
import {CustomLink} from "../UI/CustomLink";
import {useLocation, useNavigate} from "react-router";
import {useWindowDimensions} from "../../customHooks/useWindowDimensions";
export const Header = ({showDrawer, onCloseDrawer, isOpenDrawer}) => {

  const location = useLocation()
  const navigate = useNavigate()

  const { width } = useWindowDimensions();


  const isShowBackBtn = location.pathname.includes('/car/')
  const isShowDrawerBtn = location.pathname.includes('/catalog') && width < 965

  const goBack = () => navigate(-1)

  return (
    <div className={styles.header_wrapper}>
      {isShowBackBtn && <i onClick={goBack} className={`${styles.backIcon} bi bi-arrow-left`}></i>}
      {
        isShowDrawerBtn &&
        <i onClick={isOpenDrawer ? onCloseDrawer : showDrawer} className={`${styles.backIcon} bi bi-list`}></i>
      }
      <CustomLink className={styles.header_img_wrapper} to={'/'}>
        <img className={styles.header_img} src={require('../../assets/img/race-car-309123_1280.jpg')} alt="Logo"/>
      </CustomLink>
    </div>
  )
}
