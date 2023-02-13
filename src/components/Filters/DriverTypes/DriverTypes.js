import {CustomDropdown} from "../../UI/CustomDropdown/CustomDropdown";
import {Checkbox} from "antd";
import styles from "./DriverTypes.module.css";
import {useGetDriverTypesOfTransportQuery} from "../../../store/queries/autoRiaApi";
import {useSelector} from "react-redux";

export const DriverTypes = ({onChangeDriverTypes}) => {
  const categoryId = useSelector(state => state.filters.filteringParams.category_id)

  const driverTypes = useSelector(state => state.filters.filteringParams.driverTypes)


  const { data, isLoading, isError } = useGetDriverTypesOfTransportQuery(categoryId, {
    skip: !categoryId,
  })

  const typesOfDriver = data
    ? data?.map(item => ({label: item.name, value: item.value}))
    : []


  const onChange = (checkedValues) => {
    onChangeDriverTypes(checkedValues)
  };


  return (
    <>
      {
        typesOfDriver.length
          ?
          <CustomDropdown>
            <Checkbox.Group className={styles.checkbox} options={typesOfDriver} value={driverTypes} onChange={onChange} />
          </CustomDropdown>
          : null
      }
    </>
  )
}