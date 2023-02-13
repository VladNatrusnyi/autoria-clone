import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import styles from './AutoListPage.module.css'
import {CarList} from "../../components/CarList/CarList";
import ScrollToTop from "react-scroll-up";
import {changeFilterParams, setFilteringQueryString, setFilterPrams} from "../../store/filters/filtersSlice";
import {Sidebar} from "../../components/Sidebar/Sidebar";
import {useParamsInSearchString} from "../../customHooks/useParamsInSearchString";
import {objDataToString} from "../../helpers/objDataToString";


export const AutoListPage = () => {
  const dispatch = useDispatch()

  const {objOfParams, setParamsInSearch} = useParamsInSearchString()

  useEffect(() => {
    dispatch(changeFilterParams(objDataToString(objOfParams)))
  }, [])


  const onChangePagination = (page) => {
    dispatch(setFilterPrams({type: 'PAGE', data: page - 1}))
    dispatch(setFilteringQueryString())
  }

  return (
    <div>
      <ScrollToTop showUnder={1000}>
        <i style={{fontSize: 28}} className="bi bi-arrow-up-circle"></i>
      </ScrollToTop>

      <div className={styles.wrapper}>
        <div className={styles.sidebarBlock}>
          <Sidebar />
        </div>
        <div className={styles.carListBlock}>
          <CarList
            objOfParams={objOfParams}
            onChangePagination={onChangePagination}
          />
          <div className={styles.pagination}></div>
        </div>
      </div>
    </div>
  )
}