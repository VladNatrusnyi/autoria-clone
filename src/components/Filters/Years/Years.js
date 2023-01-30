import styles from './Year.module.css'
import {useDispatch, useSelector} from "react-redux";
import {YearsSelect} from "./YearsSelect";
import {useEffect} from "react";
import {setFilterPrams} from "../../../store/filters/filtersSlice";

export const Years = () => {
  const dispatch = useDispatch()
  const years = useSelector(state => state.filters.filteringParams.years)

  useEffect(() => {
    if (years.s_yers && years.po_yers && +years.po_yers < +years.s_yers) {
      let s_yers = years.s_yers
      let po_yers = years.po_yers
      dispatch(setFilterPrams({type: 'YEARS', data: {s_yers: po_yers, po_yers: s_yers}}))
    }
  }, [years])

  return (
    <div className={styles.wrapper}>
      <YearsSelect width={90} value={years.s_yers} placeholder={'Від'} type={'s_yers'}/>
      <YearsSelect width={90} value={years.po_yers} placeholder={'До'} type={'po_yers'}/>
    </div>
  )
}
