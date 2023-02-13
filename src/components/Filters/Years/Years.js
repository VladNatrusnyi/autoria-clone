import styles from './Year.module.css'
import {useDispatch, useSelector} from "react-redux";
import {YearsSelect} from "./YearsSelect";
import {useEffect} from "react";
import {repeatSearch, setFilteringQueryString, setFilterPrams} from "../../../store/filters/filtersSlice";

export const Years = ({onChangeYears, markFilterId}) => {
  const dispatch = useDispatch()
  const markArr = useSelector(state => state.filters.filteringParams.markArr)
    const {s_yers, po_yers} = markArr.find(el => el.markFilterId === markFilterId)

  const repeatSearch = () => {
    dispatch(setFilterPrams({type: 'PAGE', data: 0}))
    dispatch(setFilteringQueryString())
  }


  useEffect(() => {
    if (s_yers && po_yers && +po_yers < +s_yers) {

      const value = {s_yers: po_yers, po_yers: s_yers}

      dispatch(setFilterPrams({type: 'MARKARR', data: {
          value, markFilterId, identifier: 'year'
        }}))

      repeatSearch()
      // dispatch(setFilterPrams({type: 'YEARS', data: {s_yers: po_yers, po_yers: s_yers}}))
    }
  }, [s_yers, po_yers])

  return (
    <div className={styles.wrapper}>
      <YearsSelect
        className={styles.select}
        onChangeYears={onChangeYears}
        markFilterId={markFilterId}
        width={90}
        value={s_yers}
        placeholder={'Від'}
        type={'s_yers'}
      />
      <YearsSelect
        className={styles.select}
        onChangeYears={onChangeYears}
        markFilterId={markFilterId}
        width={90}
        value={po_yers}
        placeholder={'До'}
        type={'po_yers'}
      />
    </div>
  )
}
