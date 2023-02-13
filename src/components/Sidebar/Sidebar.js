import styles from './Sidebar.module.css'
import {TypesOfTransport} from "../Filters/TypesOfTransport/TypesOfTransport";
import {useParamsInSearchString} from "../../customHooks/useParamsInSearchString";
import {SidebarFilterBlock} from "../UI/SidebarFilterBlock/SidebarFilterBlock";
import {BodyTypes} from "../Filters/BodyTypes/BodyTypes";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
  addAnotherMark,
  changeFilterParams, clearFilters,
  setFilteringQueryString,
  setFilterPrams
} from "../../store/filters/filtersSlice";
import {SidebarMarkaFilter} from "../Filters/SidebarMarkaFilter/SidebarMarkaFilter";
import {Button} from "antd";
import {CloseOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {Price} from "../Filters/Price/Price";
import {LocationCascader} from "../Filters/LocationCascader/LocationCascader";
import {Race} from "../Filters/Race/Race";
import {GearBoxes} from "../Filters/GearBoxes/GearBoxes";
import {Fuel} from "../Filters/Fuel/Fuel";
import {DriverTypes} from "../Filters/DriverTypes/DriverTypes";
import {EngineVolume} from "../Filters/EngineVolume/EngineVolume";
import {Custom} from "../Filters/Custom/Custom";
import {Abroad} from "../Filters/Abroad/Abroad";
import {Condition} from "../Filters/Condition/Condition";
import {SubmissionPeriod} from "../Filters/SubmissionPeriod/SubmissionPeriod";
import {objDataToString} from "../../helpers/objDataToString";


export const Sidebar = () => {
  const dispatch = useDispatch()

  const {objOfParams, setParamsInSearch} = useParamsInSearchString()

  const selectedParameters = useSelector(state => state.filters.selectedParameters)

  const filteringParams = useSelector(state => state.filters.filteringParams)

  const markArr = useSelector(state => state.filters.filteringParams.markArr)
  //
  // useEffect(() => {
  //   if (selectedParameters) {
  //     setParamsInSearch(selectedParameters)
  //   }
  // }, [selectedParameters])

  const clearFilter = () => {
    dispatch(clearFilters())

    const clearedParams = {
      page: 0,
      currency: 1,
      category_id: 0
    }
    setParamsInSearch(clearedParams)
    dispatch(changeFilterParams(objDataToString(clearedParams)))
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (selectedParameters) {
        setParamsInSearch(selectedParameters)
      }
    }, 2000)

    return () => clearTimeout(timeout)
  }, [selectedParameters])

  const repeatSearch = () => {
    dispatch(setFilterPrams({type: 'PAGE', data: 0}))
    dispatch(setFilteringQueryString())
  }

   const onChangeTypesOfTransport = (value) => {
    dispatch(setFilterPrams({type: 'CATEGORY', data: value}))

     //при загрузкі із поіск строки і стор даних не буде обнуляться тип кузова
     // а при ручній зміні буде, тому бзаєм тут функцію
      dispatch(setFilterPrams({type: 'BODYSTYLE', data: []}))
      dispatch(setFilterPrams({type: 'MARKARR', data: { identifier: 'clear' }}))

     //обнуляємо пагінацію і запускаємо новий пошук
     repeatSearch()
  }

  const onChangeBodyStyle = (checkedValues) => {
    dispatch(setFilterPrams({type: 'BODYSTYLE', data: checkedValues}))
    dispatch(setFilteringQueryString())

    repeatSearch()
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

    dispatch(setFilterPrams({type: 'MARKARR', data: {
        value: null, markFilterId, identifier: 'model'
      }}))


    repeatSearch()
  }


  const onChangeModel = (value, markFilterId) => {
      if (value) {
      dispatch(setFilterPrams({type: 'MARKARR', data: {
          value, markFilterId, identifier: 'model'
        }}))
    } else {
      dispatch(setFilterPrams({type: 'MARKARR', data: {
          value: null, markFilterId, identifier: 'model'
        }}))
    }
    repeatSearch()
  }


  const onChangeYears = (value, markFilterId) => {
    dispatch(setFilterPrams({type: 'MARKARR', data: {
        value, markFilterId, identifier: 'year'
      }}))

    repeatSearch()
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

    repeatSearch()
  }

  const onChangeLocation = (value) => {
    dispatch(setFilterPrams({type: 'LOCATION', data: value}))

    repeatSearch()
  }

  const onChangeRace = (value, identifier) => {
    switch (identifier) {
      case 'raceFrom':
        dispatch(setFilterPrams({type: 'RACE', data: value}))
        break;
      case 'raceTo':
        dispatch(setFilterPrams({type: 'RACE', data: value}))
        break;
      case 'change':
        dispatch(setFilterPrams({type: 'RACE', data: value}))
        break;
      default:
        break;
    }

    repeatSearch()
  }

  const onChangeGearBoxes = (value) => {
    dispatch(setFilterPrams({type: 'GEARBOX', data: value}))

    repeatSearch()
  }

  const onChangeFuel = (value) => {
    dispatch(setFilterPrams({type: 'TYPE', data: value}))

    repeatSearch()
  }

  const onChangeDriverTypes = (value) => {
    dispatch(setFilterPrams({type: 'DRIVERTYPE', data: value}))

    repeatSearch()
  }

  const onChangeEngineVolume = (value, identifier) => {
    switch (identifier) {
      case 'engineVolumeFrom':
        dispatch(setFilterPrams({type: 'ENGINEVOLUME', data: value}))
        break;
      case 'engineVolumeTo':
        dispatch(setFilterPrams({type: 'ENGINEVOLUME', data: value}))
        break;
      case 'change':
        dispatch(setFilterPrams({type: 'ENGINEVOLUME', data: value}))
        break;
      default:
        break;
    }

    repeatSearch()
  }

  const onChangeAbroad = (value) => {
    dispatch(setFilterPrams({type: 'ABROAD', data: value}))

    repeatSearch()
  }

  const onChangeAutoRepairs = (value) => {
    const data = value ? 1 : 0
    dispatch(setFilterPrams({type: 'AUTOREPAIRS', data}))

    repeatSearch()
  }

  const onChangeSoldAuto = (value) => {
    const data = value ? 2 : 0
    dispatch(setFilterPrams({type: 'SOLD', data}))

    repeatSearch()
  }

  // const onChangeCustom = (value) => {
  //   dispatch(setFilterPrams({type: 'CUSTOM', data: value}))
  //
  //   repeatSearch()
  // }

  const onChangeTop= (value) => {
    dispatch(setFilterPrams({type: 'TOP', data: value}))

    repeatSearch()
  }



  return (
    <div className={styles.wrapper}>
      <SidebarFilterBlock title={'Тип транспорта'}>
        <TypesOfTransport width={220} onChangeTypesOfTransport={onChangeTypesOfTransport}/>
      </SidebarFilterBlock>

      {
        filteringParams.category_id ?
        <SidebarFilterBlock title={'Тип кузова'}>
          <BodyTypes onChangeBodyStyle={onChangeBodyStyle}/>
        </SidebarFilterBlock>
          :null
      }


      {
        markArr.map((el, idx) => {
          return (
            <SidebarMarkaFilter
              key={idx}
              // markFilterId={idx + 1}
              markFilterId={el.markFilterId}
              onChangeMarka={onChangeMarka}
              onChangeModel={onChangeModel}
              onChangeYears={onChangeYears}
            />
          )
        })
      }

      <Button
        style={{marginBottom: 10}}
        onClick={() => dispatch(addAnotherMark())}
        type="dashed"
        icon={<PlusOutlined />}
      >
        Добавить марку
      </Button>

      <SidebarFilterBlock title={'Ціна'}>
        <Price onChangePrice={onChangePrice}/>
      </SidebarFilterBlock>


      <SidebarFilterBlock title={'Регіон'}>
        <LocationCascader onChangeLocation={onChangeLocation}/>
      </SidebarFilterBlock>

      <SidebarFilterBlock title={'Пробіг (тис.км)'}>
        <Race onChangeRace={onChangeRace}/>
      </SidebarFilterBlock>

      {
        filteringParams.category_id ?
          <SidebarFilterBlock title={'Коробка передач'}>
            <GearBoxes onChangeGearBoxes={onChangeGearBoxes}/>
          </SidebarFilterBlock>
          : null
      }

      <SidebarFilterBlock title={'Паливо'}>
        <Fuel onChangeFuel={onChangeFuel}/>
      </SidebarFilterBlock>


      <SidebarFilterBlock title={'Тип приводу'}>
        <DriverTypes onChangeDriverTypes={onChangeDriverTypes}/>
      </SidebarFilterBlock>

      <SidebarFilterBlock title={'Об’єм двигуна (л.)'}>
        <EngineVolume onChangeEngineVolume={onChangeEngineVolume}/>
      </SidebarFilterBlock>

      {/*<SidebarFilterBlock title={'Розмитнені'}>*/}
      {/*  <Custom onChangeCustom={onChangeCustom}/>*/}
      {/*</SidebarFilterBlock>*/}

      <SidebarFilterBlock title={'Наявність в Україні'}>
        <Abroad onChangeAbroad={onChangeAbroad}/>
      </SidebarFilterBlock>

      <SidebarFilterBlock title={'Стан'}>
        <Condition onChangeAutoRepairs={onChangeAutoRepairs} onChangeSoldAuto={onChangeSoldAuto}/>
      </SidebarFilterBlock>


      <SidebarFilterBlock title={'Період подачі'}>
        <SubmissionPeriod onChangeTop={onChangeTop}/>
      </SidebarFilterBlock>

      <br/>

      <Button
        onClick={clearFilter}
        type="dashed"
        icon={<CloseOutlined />}
      >
        Скинути всі фільтри
      </Button>

    </div>
  )
}