import {Checkbox, Select} from "antd";
import {useSelector} from "react-redux";
import {setFilterPrams} from "../../../store/filters/filtersSlice";
import {useEffect, useMemo, useState} from "react";

const options = [
  { value: '0', label: 'Всі авто' },
  { value: '2', label: 'Авто в Україні' },
  { value: '1', label: 'Авто не в Україні' },
]
export const Abroad = ({onChangeAbroad}) => {

  const abroad = useSelector(state => state.filters.filteringParams.abroad).toString()


  const handleChange = (value) => {
    console.log(`selected ${value}`);
    onChangeAbroad(value)
  };


  return (
    <Select
      // defaultValue={abroad}
      value={abroad}
      style={{ width:'100%'}}
      onChange={handleChange}
      options={options}
    />
  )
}