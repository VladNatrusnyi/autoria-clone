import {useSelector} from "react-redux";
import {useMemo} from "react";
import {useGetModelsOfTransportQuery} from "../../../store/queries/autoRiaApi";
import {Select} from "antd";

export const Model = ({width = 120, onChangeModel, markFilterId}) => {
  const categoryId = useSelector(state => state.filters.filteringParams.category_id)

  const markArr = useSelector(state => state.filters.filteringParams.markArr)

  const markId = markArr.find(el => el.markFilterId === markFilterId)?.marka_id

  const modelId = markArr.find(el => el.markFilterId === markFilterId)?.model_id

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
    onChangeModel(value, markFilterId)
  };


  useMemo(() => {
    if (isFetching) {
      console.log('Model isFetching')
    }
    }, [isFetching])


  return (
    <>
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
        value={modelId === 0 || !models.length ? null : modelId}
        placeholder='Модель'
        onChange={onChange}
        // onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={models}
      />
    </>
  )
}
