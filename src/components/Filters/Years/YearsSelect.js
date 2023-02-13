import {yearArr} from "../../../helpers/yearArr";
import {Select} from "antd";
import {setFilterPrams} from "../../../store/filters/filtersSlice";
import {useDispatch, useSelector} from "react-redux";

export const YearsSelect = ({width = 90, value, placeholder, type, onChangeYears, markFilterId}) => {
  const dispatch = useDispatch()
  const {s_yers, po_yers} = useSelector(state => state.filters.filteringParams.markArr)
    .find(el => el.markFilterId === markFilterId)

  const years = {s_yers, po_yers}

  const onChange = (value) => {
    onChangeYears({...years, [type]: value ? value : null}, markFilterId)
    // dispatch(setFilterPrams({type: 'YEARS', data: {...years, [type]: value ? value : null}}))
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
