import {useGetFuelOfTransportQuery} from "../../../store/queries/autoRiaApi";
import {CustomDropdown} from "../../UI/CustomDropdown/CustomDropdown";
import {Checkbox} from "antd";
import styles from "./Fuel.module.css";
import {useSelector} from "react-redux";

export const Fuel = ({onChangeFuel}) => {

  const type = useSelector(state => state.filters.filteringParams.type)

  const { data, isLoading, isError } = useGetFuelOfTransportQuery(undefined, {})

  const fuelTypes = data
    ? data?.map(item => ({label: item.name, value: item.value}))
    : []

  const onChange = (checkedValues) => {
    console.log('checkedValues', checkedValues)
    onChangeFuel(checkedValues)
  };

  return (
    <>
      {
        fuelTypes.length
          ?
          <CustomDropdown>
            <Checkbox.Group className={styles.checkbox} options={fuelTypes} value={type} onChange={onChange} />
          </CustomDropdown>
          : null
      }
    </>
  )
}