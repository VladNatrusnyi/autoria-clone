import {Select} from "antd";
import {useGetRegionsOfTransportQuery} from "../../../store/queries/autoRiaApi";
import {setFilterPrams} from "../../../store/filters/filtersSlice";
import {useDispatch, useSelector} from "react-redux";

export const State = ({width = 120}) => {
  const dispatch = useDispatch()

  const statesId = useSelector(state => state.filters.filteringParams.location.state)

  const { data , isLoading, isError } = useGetRegionsOfTransportQuery(undefined, {})

  const states = data && data.map(item => ({label: item.name, value: item.value}))

  const onChange = (value) => {
    if (value) {
      dispatch(setFilterPrams({type: 'STATE', data: value}))
    } else {
      dispatch(setFilterPrams({type: 'STATE', data: null}))
    }
  };

  return (
    <Select
      loading={isLoading}
      showSearch
      allowClear
      style={{
        width: width,
      }}
      value={statesId}
      placeholder='Регіон'
      onChange={onChange}
      // onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={states}
    />
  )
}
