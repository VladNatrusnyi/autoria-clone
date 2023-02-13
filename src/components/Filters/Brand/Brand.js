import {Select} from "antd";
import { useGetMarksOfTransportQuery } from "../../../store/queries/autoRiaApi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setFilterPrams} from "../../../store/filters/filtersSlice";

export const Brand = ({width = 120, onChangeMarka, markFilterId}) => {
  const dispatch = useDispatch()

  const categoryId = useSelector(state => state.filters.filteringParams.category_id)

  const markArr = useSelector(state => state.filters.filteringParams.markArr)

  const markValue = markArr.find(el => el.markFilterId === markFilterId)?.marka_id

  // useEffect(() => {
  //   // dispatch(setFilterPrams({type: 'MARKA', data: null}))
  //   onChangeMarka(null, markFilterId)
  // }, [categoryId])

  const { data , isLoading, isError } = useGetMarksOfTransportQuery(categoryId, {
    skip: !categoryId,
  })

  const marks = data
    ? [{label: 'Будь-який', value: 0}, ...data?.map(item => ({label: item.name, value: item.value}))]
    : []



  const onChange = (value) => {
    onChangeMarka(value, markFilterId)
    // if (value) {
    //   dispatch(setFilterPrams({type: 'MARKA', data: value}))
    // } else {
    //   dispatch(setFilterPrams({type: 'MARKA', data: null}))
    // }
  };

  // const onSearch = (value) => {
  //   console.log('search:', value);
  // };

   return (
     <Select
       loading={isLoading}
       showSearch
       allowClear
       style={{
         width: width,
       }}
       notFoundContent={
         <div style={{fontSize: '10px'}}>Спочатку оберіть тип транспорту</div>
       }
       value={markValue}
       placeholder='Марка'
       onChange={onChange}
       // onSearch={onSearch}
       filterOption={(input, option) =>
         (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
       }
       options={marks}
     />
  )
}
