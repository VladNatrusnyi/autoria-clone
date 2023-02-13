import {Checkbox, Col, Row} from "antd";
import styles from "../Fuel/Fuel.module.css";
import {CustomDropdown} from "../../UI/CustomDropdown/CustomDropdown";
import {useSelector} from "react-redux";

const options = [
  {
    label: 'Нерозмитнений',
    value: 1
  },
  {
    label: 'Розмитнений',
    value: 0
  }
]

export const Custom = ({onChangeCustom}) => {

  const custom = useSelector(state => state.filters.filteringParams.custom)

  const onChange = (checkedValues) => {
    onChangeCustom(checkedValues)
  };


  return (
    <CustomDropdown>
      <Checkbox.Group className={styles.checkbox} options={options} value={custom} onChange={onChange} />
    </CustomDropdown>
  )
}