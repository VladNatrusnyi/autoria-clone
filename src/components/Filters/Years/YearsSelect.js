import {yearArr} from "../../../helpers/yearArr";
import {Select} from "antd";
import {setFilterPrams} from "../../../store/filters/filtersSlice";
import {useDispatch, useSelector} from "react-redux";

export const YearsSelect = ({width = 90, value, placeholder, type}) => {
  const dispatch = useDispatch()
  const years = useSelector(state => state.filters.filteringParams.years)

  const onChange = (value) => {
    dispatch(setFilterPrams({type: 'YEARS', data: {...years, [type]: value ? value : null}}))
  }

  return (
    <Select
      showSearch
      allowClear
      style={{
        width: width,
      }}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={yearArr}
    />
  )
}
