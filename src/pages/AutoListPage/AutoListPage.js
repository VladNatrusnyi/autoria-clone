import {Outlet, useLocation, useParams} from "react-router";
import {useGetCarsIdQuery, useGetCarsQuery} from "../../store/queries/autoRiaApi";
import {useDispatch} from "react-redux";
import {useEffect, useMemo} from "react";
import styles from './AutoListPage.module.css'
import {CarNumber} from "../../components/UI/CarNumber/CarNumber";
import {CarList} from "../../components/CarList/CarList";

export const AutoListPage = () => {
  return (
    <div>
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