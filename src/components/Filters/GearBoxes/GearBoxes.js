import {Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useGetGearboxesOfTransportQuery} from "../../../store/queries/autoRiaApi";
import {setFilterPrams} from "../../../store/filters/filtersSlice";
import {useMemo} from "react";

export const GearBoxes = ({onChangeGearBoxes}) => {
  const dispatch = useDispatch()

  const categoryId = useSelector(state => state.filters.filteringParams.category_id)

  const gearBox = useSelector(state => state.filters.filteringParams.gearbox)

    const handleChange = (value) => {
      onChangeGearBoxes(value)
    };


  const { data, isLoading, isError } = useGetGearboxesOfTransportQuery(categoryId, {
    skip: !categoryId,
  })

  const gearBoxes = data
    ? data?.map(item => ({label: item.name, value: item.value}))
    : []

  console.log('gearBoxes', data)

  return (
    <div>
      {
        gearBoxes.length ?
          <Select
            loading={isLoading}
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            value={gearBox}
            placeholder="Виберіть коробку передач"
            onChange={handleChange}
            options={gearBoxes}
          /> : null
      }
    </div>
  )
}