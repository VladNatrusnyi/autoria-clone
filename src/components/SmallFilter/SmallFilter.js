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
import {clearParamsString, setFilteringQueryString, setFilterPrams} from "../../store/filters/filtersSlice";
import {useNavigate} from "react-router";
import {LocationCascader} from "../Filters/LocationCascader/LocationCascader";


export const SmallFilter = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    s_yers,
    po_yers,
    price_do,
    price_ot,
    currency
  } = useSelector(state => state.filters.filteringParams)
  const paramsString = useSelector(state => state.filters.paramsString)

  const currencyTypes = useSelector(state => state.filters.currencyTypes)

  const pricePanelName = useMemo(() => {
    const currencyValue = currencyTypes.find(el => el.value === currency.toString()).label
    if (!price_ot && !price_do) {
      return 'Ціна'
    } else if (price_ot && price_do) {
      return `Ціна, ${price_ot + currencyValue} - ${price_do + currencyValue}`
    } else if (price_ot && !price_do) {
      return `Ціна, від ${price_ot + currencyValue}`
    } else {
      return `Ціна, до ${price_do + currencyValue}`
    }
  }, [price_do, price_ot, currency])


  const yearsPanelName = useMemo(() => {
    if (!s_yers && !po_yers) {
      return 'Рік випуску'
    } else if (s_yers && po_yers) {
      return `Рік випуску ${s_yers} - ${po_yers}`
    } else {
      return `Рік випуску ${s_yers || po_yers }`
    }
  }, [s_yers, po_yers])

  const getFilterParams = () => {
    dispatch(setFilteringQueryString())
  }

  useEffect(() => {
    if (paramsString) {
      navigate(`catalog?${paramsString}`)
      dispatch(clearParamsString())
    }
  }, [paramsString])


  const onChangeTypesOfTransport = (value) => {
    dispatch(setFilterPrams({type: 'CATEGORY', data: value}))
  }

  const onChangeMarka = (value, markFilterId) => {

    if (value) {
      dispatch(setFilterPrams({type: 'MARKARR', data: {
          value, markFilterId, identifier: 'mark'
        }}))
    } else {
      dispatch(setFilterPrams({type: 'MARKARR', data: {
          value: null, markFilterId, identifier: 'mark'
        }}))
    }
    // if (value) {
    //   dispatch(setFilterPrams({type: 'MARKA', data: value}))
    // } else {
    //   dispatch(setFilterPrams({type: 'MARKA', data: null}))
    // }
  }


  const onChangeModel = (value, markFilterId) => {
    // if (value) {
    //   dispatch(setFilterPrams({type: 'MODEL', data: value}))
    // } else {
    //   dispatch(setFilterPrams({type: 'MODEL', data: null}))
    // }

    if (value) {
      dispatch(setFilterPrams({type: 'MARKARR', data: {
        value, markFilterId, identifier: 'model'
        }}))
    } else {
      dispatch(setFilterPrams({type: 'MARKARR', data: {
          value: null, markFilterId, identifier: 'model'
        }}))
    }
  }


  const onChangeYears = (value, markFilterId) => {
    dispatch(setFilterPrams({type: 'MARKARR', data: {
        value, markFilterId, identifier: 'model'
      }}))
  }

  const onChangePrice = (value, identifier) => {
    switch (identifier) {
      case 'price_ot':
        dispatch(setFilterPrams({type: 'PRICE', data: value}))
        break;
      case 'price_do':
        dispatch(setFilterPrams({type: 'PRICE', data: value}))
        break;
      case 'currency':
        dispatch(setFilterPrams({type: 'PRICE', data: value}))
        break;
      case 'change':
        dispatch(setFilterPrams({type: 'PRICE', data: value}))
        break;
      default:
        break;
    }
  }

  const onChangeLocation = (value) => {
    dispatch(setFilterPrams({type: 'LOCATION', data: value}))
  }


  return (
    <div className={styles.wrapper}>
      <div>
        <TypesOfTransport width={250} onChangeTypesOfTransport={onChangeTypesOfTransport}/>
      </div>

      <div>
        <Brand width={250} onChangeMarka={onChangeMarka} markFilterId={1}/>
      </div>

      <div>
        <Model width={250} onChangeModel={onChangeModel} markFilterId={1}/>
      </div>

      <div style={{width: 250}}>
        <LocationCascader onChangeLocation={onChangeLocation}/>
      </div>

      <div>
        <CollapseWrapper width={250} panelName={pricePanelName}>
          <Price onChangePrice={onChangePrice}/>
        </CollapseWrapper>
      </div>

      <div>
        <CollapseWrapper width={250} panelName={yearsPanelName}>
          <Years onChangeYears={onChangeYears} markFilterId={1}/>
        </CollapseWrapper>
      </div>



      <Button className={styles.btn} type="primary" onClick={getFilterParams} icon={<SearchOutlined />}>Пошук</Button>

    </div>
  )
}
