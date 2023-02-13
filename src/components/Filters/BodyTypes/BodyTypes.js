import styles from './BodyTypes.module.css'
import {useGetBodyTypesQuery} from "../../../store/queries/autoRiaApi";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox} from "antd";
import {CustomDropdown} from "../../UI/CustomDropdown/CustomDropdown";

export const BodyTypes = ({onChangeBodyStyle}) => {
  const categoryId = useSelector(state => state.filters.filteringParams.category_id)

  const bodystyle = useSelector(state => state.filters.filteringParams.bodystyle)

  const { data , isLoading, isError } = useGetBodyTypesQuery(categoryId, {
    skip: !categoryId,
  })

   const bodyTypes = data
    ? data?.map(item => ({label: item.name, value: item.value}))
    : []

  const onChange = (checkedValues) => {
    onChangeBodyStyle(checkedValues)
  };

  return (
    <>
      {
        bodyTypes.length
          ?
        <CustomDropdown>
          <Checkbox.Group className={styles.checkbox} options={bodyTypes} value={bodystyle} onChange={onChange} />
        </CustomDropdown>
          : null
      }
    </>
  )
}