import {CarListItem} from "./CarListItem/CarListItem";
import {useGetCarsIdQuery, useGetCarsQuery} from "../../store/queries/autoRiaApi";
import {Pagination, Skeleton} from "antd";
import styles from './CarList.module.css'
import {useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {useParamsInSearchString} from "../../customHooks/useParamsInSearchString";
import {PreloaderCar} from "../UI/PreloaderCar/PreloaderCar";

export const CarList = ({objOfParams, onChangePagination}) => {

  const page = useSelector(state => state.filters.filteringParams.page)

  const stringOfParams = Object.entries(objOfParams).map(el => el.join('=')).join('&')

  const { data: carsId, isFetching: isLoadingCarsId, isError } = useGetCarsIdQuery(stringOfParams, {
    skip: !stringOfParams,
  })

  const { data: cars, isFetching: isLoadingCars } = useGetCarsQuery(carsId && carsId.ids, {
    skip: carsId && !carsId.count,
  })

  const skeleton = carsId && carsId.ids.map(carId => {
        return (
          <Skeleton
            className={styles.skeleton}
            key={carId}
            active
            paragraph={{
              rows: 4,
            }}
          />
        )
      })

  // if (carsId && carsId.count && isLoadingCars) {
  //   return carsId.ids.map(carId => {
  //     return (
  //       <Skeleton
  //         className={styles.skeleton}
  //         key={carId}
  //         active
  //         paragraph={{
  //           rows: 4,
  //         }}
  //       />
  //     )
  //   })
  // }


  if (carsId && !carsId.count) {
    return (
      <>
        <div style={{textAlign: 'center'}}>
          <h3>На жаль, ми не знайши авто за вашим запитом</h3>
          {/*<h4>Але ми підібрали схожі варіанти</h4>*/}
        </div>
      </>
    )
  }

  return (
    <>
      {
        isLoadingCarsId ?
          <PreloaderCar />
          // <img src={require('./../../assets/img/preloader.gif')} alt="preloader"/>
          : carsId && carsId.count && isLoadingCars ? skeleton
          : cars && cars.length && cars.map(car => {
            return <CarListItem key={car.autoData.autoId} carData={car}/>
          })
      }

      {/*{*/}
      {/*  isLoadingCarsId && <img src={require('./../../assets/img/preloader.gif')} alt="preloader"/>*/}
      {/*}*/}

      {/*{*/}
      {/*  cars && cars.length && cars.map(car => {*/}
      {/*    return <CarListItem key={car.autoData.autoId} carData={car}/>*/}
      {/*  })*/}
      {/*}*/}

      {
        carsId && carsId.count && !isLoadingCarsId &&
        <Pagination
          className={styles.pagination}
          pageSize={10}
          showSizeChanger={false}
          defaultCurrent={+page + 1}
          total={carsId.count}
          responsive={true}
          onChange={(page) => {
            onChangePagination(page)
            window.scrollTo(0, 0)
          }}
        />
      }
   </>
  )
}