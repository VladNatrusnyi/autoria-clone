import {Select} from "antd";
import {useSelector} from "react-redux";

export const SubmissionPeriod = ({onChangeTop}) => {

  const options = [
    { value: '0', label: 'Усі' },
    { value: '1', label: 'за годину' },
    { value: '2', label: 'за сьогоднi' },
    { value: '3', label: 'за три днi' },
    { value: '4', label: 'за тиждень' },
    { value: '5', label: 'за мiсяць' },
    { value: '6', label: 'за 3 мiсяцi' },
    { value: '8', label: ' за 3 години' },
    { value: '9', label: 'за 6 годин' },
    { value: '10', label: 'за 2 днi' },
    { value: '11', label: ' за добу' },
    { value: '14', label: 'за 12 годин' },
  ]

  const top = useSelector(state => state.filters.filteringParams.top).toString()


  const handleChange = (value) => {
    console.log(`selected ${value}`);
    onChangeTop(value)
  };


  return (
    <Select
      value={top}
      style={{ width:'100%'}}
      onChange={handleChange}
      options={options}
    />
  )
}