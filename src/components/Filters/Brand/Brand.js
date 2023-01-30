import {Select} from "antd";
import { useGetMarksOfTransportQuery } from "../../../store/queries/autoRiaApi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setFilterPrams} from "../../../store/filters/filtersSlice";

export const Brand = ({width = 120}) => {
  const dispatch = useDispatch()

  const categoryId = useSelector(state => state.filters.filteringParams.category_id)
  const markValue = useSelector(state => state.filters.filteringParams.marka_id)

  useEffect(() => {
    dispatch(setFilterPrams({type: 'MARKA', data: null}))
  }, [categoryId])

  const { marks = [] , isLoading, isError } = useGetMarksOfTransportQuery(categoryId, {
    skip: !categoryId,
    selectFromResult: ({ data }) => ({
      marks: data?.map(item => ({label: item.name, value: item.value})),
    }),
  })



  const onChange = (value) => {
    if (value) {
      dispatch(setFilterPrams({type: 'MARKA', data: value}))
    } else {
      dispatch(setFilterPrams({type: 'MARKA', data: null}))
    }
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
