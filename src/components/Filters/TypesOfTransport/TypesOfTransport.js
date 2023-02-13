import {Select} from "antd";
import {useGetTypesOfTransportQuery} from "../../../store/queries/autoRiaApi";
import {useDispatch, useSelector} from "react-redux";
import {setFilterPrams} from "../../../store/filters/filtersSlice";
import {useMemo} from "react";
import {useParamsInSearchString} from "../../../customHooks/useParamsInSearchString";

export const TypesOfTransport = ({width = 120, onChangeTypesOfTransport}) => {
  const dispatch = useDispatch()

  const category_id = useSelector(state => state.filters.filteringParams.category_id)

  const onChange = (value) => {
    onChangeTypesOfTransport(value)
    // dispatch(setFilterPrams({type: 'CATEGORY', data: value}))
  };

  const { data, isLoading, isError } = useGetTypesOfTransportQuery(undefined, {})

  const types = data
    ? [{label: 'Будь-який', value: 0}, ...data?.map(item => ({label: item.name, value: item.value}))]
    : []


  return (
    <>
      {
        types.length ?
          <Select
            loading={isLoading}
            value={category_id}
            placeholder='Тип транспорту'
            style={{
              width: width,
            }}
            onChange={onChange}
            options={types}
          />
          : null
      }
    </>
  )
 }
