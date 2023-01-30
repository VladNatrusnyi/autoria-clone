import {Select} from "antd";
import {useGetTypesOfTransportQuery} from "../../../store/queries/autoRiaApi";
import {useDispatch} from "react-redux";
import {setFilterPrams} from "../../../store/filters/filtersSlice";

export const TypesOfTransport = ({width = 120}) => {
  const dispatch = useDispatch()

  const onChange = (value) => {
    console.log(`selected ${value}`);
    dispatch(setFilterPrams({type: 'CATEGORY', data: value}))
  };

  const { types , isLoading, isError } = useGetTypesOfTransportQuery(undefined, {
    selectFromResult: ({ data }) => ({
      types: data && [{label: 'Будь-який', value: 0}, ...data?.map(item => ({label: item.name, value: item.value}))],
    }),
  })


  return (
    <Select
      loading={isLoading}
      defaultValue={0}
      placeholder='Тип транспорту'
      style={{
        width: width,
      }}
      onChange={onChange}
      options={types}
    />
  )
 }
