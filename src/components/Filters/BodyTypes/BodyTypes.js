import styles from './BodyTypes.module.css'
import {useGetBodyTypesQuery} from "../../../store/queries/autoRiaApi";
import {useDispatch, useSelector} from "react-redux";
import {setFilterPrams} from "../../../store/filters/filtersSlice";
import {useEffect, useState} from "react";
import {Checkbox, Divider} from "antd";
import {CustomDropdown} from "../../UI/CustomDropdown/CustomDropdown";

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

export const BodyTypes = ({onChangeBodyStyle}) => {
  const dispatch = useDispatch()

  const categoryId = useSelector(state => state.filters.filteringParams.category_id)

  const bodystyle = useSelector(state => state.filters.filteringParams.bodystyle)

  const { data , isLoading, isError } = useGetBodyTypesQuery(categoryId, {
    skip: !categoryId,
  })

   const bodyTypes = data
    ? data?.map(item => ({label: item.name, value: item.value}))
    : []

  // useEffect(() => {
  //     dispatch(setFilterPrams({type: 'BODYSTYLE', data: []}))
  // }, [categoryId])

  const onChange = (checkedValues) => {
    // console.log('checkedValues', checkedValues)
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