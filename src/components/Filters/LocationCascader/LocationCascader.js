import {Cascader} from "antd";
import {useGetRegionsOfTransportQuery} from "../../../store/queries/autoRiaApi";
import {useDispatch, useSelector} from "react-redux";
import {setFilteringQueryString, setFilterPrams} from "../../../store/filters/filtersSlice";

const filter = (inputValue, path) => path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

export const LocationCascader = ({onChangeLocation, width}) => {
  const dispatch = useDispatch()

  const location = useSelector(state => state.filters.filteringParams.location)

  const { data: states , isLoading, isError } = useGetRegionsOfTransportQuery(undefined, {})

  const onChange = (value) => {
    onChangeLocation(value)
  };

  return (
    <div>
      <Cascader
        style={{
          width: '100%',
        }}
        options={states}
        onChange={onChange}
        multiple
        maxTagCount="responsive"
        value={location}

        placeholder="Введіть місто"
        showSearch={{
          filter,
        }}
        onSearch={(value) => console.log(value)}
      />
    </div>
  )
}