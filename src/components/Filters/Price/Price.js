import {Select, Input, InputNumber,} from "antd";
import { Collapse} from 'antd';
import styles from './Price.module.css'
import {setFilterPrams} from "../../../store/filters/filtersSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
const { Option } = Select;


export const Price = ({onChangePrice}) => {
  const dispatch = useDispatch()

  const currencyTypes = useSelector(state => state.filters.currencyTypes)

  const {price_do, price_ot, currency} = useSelector(state => state.filters.filteringParams)

  const price = {price_do, price_ot, currency}

  useEffect(() => {
    const a = setTimeout(() => {
      if (price_do && price_ot && price_do < price_ot) {
        const value = {...price, price_ot: price_do, price_do: price_ot }
        onChangePrice(value, 'change')
        // dispatch(setFilterPrams({type: 'PRICE', data: {...price, price_ot: price_do, price_do: price_ot }}))
      }
    },2000);

    return () => clearTimeout(a)
  }, [price])

  const onChangePriceOt = (value) => {
    onChangePrice({...price, price_ot: value}, 'price_ot')
    // dispatch(setFilterPrams({type: 'PRICE', data: value}))
  };

  const onChangePriceDo = (value) => {
    onChangePrice({...price, price_do: value}, 'price_do')
    // dispatch(setFilterPrams({type: 'PRICE', data: value}))
  };


  const handleChangeCurrency = (value) => {
    onChangePrice({...price, currency: value}, 'currency')
    // dispatch(setFilterPrams({type: 'PRICE', data: value}))
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.inputGroup}>
        <InputNumber
          placeholder="Від"
          style={{ width: 70, textAlign: 'center', fontSize: 12}}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          min={0}
          onChange={onChangePriceOt}
          value={price.price_ot}
        />

        <p className={styles.separator}>-</p>

        <InputNumber
          placeholder="До"
          className="site-input-right"
          style={{
            width: 70,
            textAlign: 'center',
            fontSize: 12
          }}
          min={0}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          onChange={onChangePriceDo}
          value={price.price_do}
        />
      </div>

      <Select
        defaultValue={price.currency}
        style={{
          width: 50,
          height: 30,
        }}
        onChange={handleChangeCurrency}
        options={currencyTypes}
      />
    </div>
  )
}
