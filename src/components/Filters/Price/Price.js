import {Select, InputNumber,} from "antd";
import styles from './Price.module.css'
import {useSelector} from "react-redux";
import {useEffect} from "react";

export const Price = ({onChangePrice}) => {
  const currencyTypes = useSelector(state => state.filters.currencyTypes)

  const {price_do, price_ot, currency} = useSelector(state => state.filters.filteringParams)

  const price = {price_do, price_ot, currency}

  useEffect(() => {
    const a = setTimeout(() => {
      if (price_do && price_ot && price_do < price_ot) {
        const value = {...price, price_ot: price_do, price_do: price_ot }
        onChangePrice(value, 'change')
      }
    },2000);

    return () => clearTimeout(a)
  }, [price])

  const onChangePriceOt = (value) => {
    onChangePrice({...price, price_ot: value}, 'price_ot')
  };

  const onChangePriceDo = (value) => {
    onChangePrice({...price, price_do: value}, 'price_do')
  };


  const handleChangeCurrency = (value) => {
    onChangePrice({...price, currency: value}, 'currency')
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
