import styles from './SmallFilter.module.css'
import {TypesOfTransport} from "../Filters/TypesOfTransport/TypesOfTransport";
import {Brand} from "../Filters/Brand/Brand";
import {Model} from "../Filters/Model/Model";
import {State} from "../Filters/State/State";
import {Price} from "../Filters/Price/Price";
import {CollapseWrapper} from "../UI/CollapseWrapper";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {Years} from "../Filters/Years/Years";
import {Button} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import {clearParamsString, setFilteringQueryString} from "../../store/filters/filtersSlice";
import {useNavigate} from "react-router";


export const SmallFilter = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const price = useSelector(state => state.filters.filteringParams.price)
  const years = useSelector(state => state.filters.filteringParams.years)
  const paramsString = useSelector(state => state.filters.paramsString)

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

  const getFilterParams = () => {
    dispatch(setFilteringQueryString())
  }

  useEffect(() => {
    if (paramsString) {
      navigate(`catalog?${paramsString}`)
      dispatch(clearParamsString())
    }
  }, [paramsString])


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

      <Button type="primary" onClick={getFilterParams} icon={<SearchOutlined />}>Пошук</Button>

    </div>
  )
}
