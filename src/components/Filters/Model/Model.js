import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {setFilterPrams} from "../../../store/filters/filtersSlice";
import {useGetModelsOfTransportQuery} from "../../../store/queries/autoRiaApi";
import {Select} from "antd";

export const Model = ({width = 120}) => {
  const dispatch = useDispatch()

  const categoryId = useSelector(state => state.filters.filteringParams.category_id)
  const markId = useSelector(state => state.filters.filteringParams.marka_id)
  const modelId = useSelector(state => state.filters.filteringParams.model_id)

  useEffect(() => {
    dispatch(setFilterPrams({type: 'MODEL', data: null}))
  }, [markId, categoryId])

  const { data, isLoading, isFetching, isError } = useGetModelsOfTransportQuery({categoryId, markId}, {
    skip: !markId,
  })

  const models = data
    ? data?.map(category => {
      if (Array.isArray(category)) {
        return {
          label: category[0].name,
          options: category.map(item => ({label: item.name, value: item.value}))
        }
      } else {
        return ({label: category.name, value: category.value})
      }
    })
    : []


  const onChange = (value) => {
    if (value) {
      dispatch(setFilterPrams({type: 'MODEL', data: value}))
    } else {
      dispatch(setFilterPrams({type: 'MODEL', data: null}))
    }
  };


  useMemo(() => {
    if (isFetching) {
      console.log('Model isFetching')
    }
    }, [isFetching])

  // const onSearch = (value) => {
  //   console.log('search:', value);
  // };

  return (
    <Select
      loading={isLoading}
      showSearch
      allowClear
      style={{
        width: width,
      }}
      notFoundContent={
        <div>Спочатку оберіть модель</div>
      }
      value={modelId}
      placeholder='Модель'
      onChange={onChange}
      // onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={models}
    />
  )
}
