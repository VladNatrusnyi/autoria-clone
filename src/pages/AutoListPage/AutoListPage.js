import {Outlet, useLocation, useParams} from "react-router";
import {useGetCarsIdQuery, useGetCarsQuery} from "../../store/queries/autoRiaApi";
import {useDispatch} from "react-redux";
import {useEffect, useMemo} from "react";
import styles from './AutoListPage.module.css'
import {CarNumber} from "../../components/UI/CarNumber/CarNumber";
import {CarList} from "../../components/CarList/CarList";
import ScrollToTop from "react-scroll-up";


export const AutoListPage = () => {
  return (
    <div>
      <ScrollToTop showUnder={1000}>
        <i style={{fontSize: 28}} className="bi bi-arrow-up-circle"></i>
      </ScrollToTop>

      <div className={styles.wrapper}>
        <div className={styles.sidebarBlock}>
          <br/><br/>
          <CarNumber />
          <br/><br/><br/>
        </div>
        <div className={styles.carListBlock}>
          {/*//outlet для carlist*/}
          {/*<Outlet/>*/}
          <CarList />
          <div className={styles.pagination}></div>
        </div>
      </div>
    </div>
  )
}