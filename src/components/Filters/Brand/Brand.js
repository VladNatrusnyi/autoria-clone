import {Select} from "antd";
import { useGetMarksOfTransportQuery } from "../../../store/queries/autoRiaApi";
import {useDispatch, useSelector} from "react-redux";

export const Brand = ({width = 120, onChangeMarka, markFilterId}) => {

  const categoryId = useSelector(state => state.filters.filteringParams.category_id)

  const markArr = useSelector(state => state.filters.filteringParams.markArr)

  const markValue = markArr.find(el => el.markFilterId === markFilterId)?.marka_id

  const { data , isLoading, isError } = useGetMarksOfTransportQuery(categoryId, {
    skip: !categoryId,
  })

  const marks = data
    ? [{label: 'Будь-який', value: 0}, ...data?.map(item => ({label: item.name, value: item.value}))]
    : []


  const onChange = (value) => {
    onChangeMarka(value, markFilterId)
  };

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
