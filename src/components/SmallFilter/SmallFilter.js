import styles from './SmallFilter.module.css'
import {TypesOfTransport} from "../Filters/TypesOfTransport/TypesOfTransport";
import {Brand} from "../Filters/Brand/Brand";
import {Model} from "../Filters/Model/Model";
import {State} from "../Filters/State/State";
import {Price} from "../Filters/Price/Price";
import {CollapseWrapper} from "../UI/CollapseWrapper";
import {useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";
import {Years} from "../Filters/Years/Years";
import {Button} from "antd";
import {setFilteringQueryString} from "../../store/filters/filtersSlice";


export const SmallFilter = () => {
  const dispatch = useDispatch()

  const price = useSelector(state => state.filters.filteringParams.price)
  const years = useSelector(state => state.filters.filteringParams.years)

  const currencyTypes = useSelector(state => state.filters.currencyTypes)

  const pricePanelName = useMemo(() => {
    const currency = currencyTypes.find(el => el.value === price.currency).label
    if (!price.price_ot && !price.price_do) {
      return 'Ціна'
    } else if (price.price_ot && price.price_do) {
      return `Ціна, ${price.price_ot + currency} - ${price.price_do + currency}`
    } else if (price.price_ot && !price.price_do) {
      return `Ціна, від ${price.price_ot + currency}`
    } else {
      return `Ціна, до ${price.price_do + currency}`
    }
  }, [price])


  const yearsPanelName = useMemo(() => {
    if (!years.s_yers && !years.po_yers) {
      return 'Рік випуску'
    } else if (years.s_yers && years.po_yers) {
      return `Рік випуску ${years.s_yers} - ${years.po_yers}`
    } else {
      return `Рік випуску ${years.s_yers || years.po_yers }`
    }
  }, [years])

  const foo = () => {
    dispatch(setFilteringQueryString())
  }



  return (
    <div className={styles.wrapper}>
      <TypesOfTransport width={250}/>
      <Brand width={250}/>
      <Model width={250}/>
      <State width={250}/>
      <CollapseWrapper width={250} panelName={pricePanelName}>
        <Price />
      </CollapseWrapper>
      <CollapseWrapper width={250} panelName={yearsPanelName}>
        <Years />
      </CollapseWrapper>

      <Button type="primary" onClick={foo}>Пошук</Button>
    </div>
  )
}
