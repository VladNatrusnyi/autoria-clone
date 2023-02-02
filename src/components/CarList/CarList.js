import {CarListItem} from "./CarListItem/CarListItem";
import {useParams} from "react-router";
import {useGetCarsIdQuery, useGetCarsQuery} from "../../store/queries/autoRiaApi";
import {useEffect, useMemo, useState} from "react";
import {Pagination, Skeleton} from "antd";
import styles from './CarList.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setFilteringQueryString, setFilterPrams} from "../../store/filters/filtersSlice";
import {useSearchParams} from "react-router-dom";

export const CarList = () => {
  const dispatch = useDispatch()
  // const {params} = useParams()

  const [searchParams, setSearchParams] = useSearchParams()

  const objOfParams = searchParams.toString().split('&').map(item => {
    const arr = item.split('=')
    return {[arr[0]]: arr[1]}
  }).reduce((total, amount) => ({...total, ...amount}));

  // console.log('objOfParams', objOfParams)


  const { data: carsId, isFetching: isLoadingCarsId, isError } = useGetCarsIdQuery(searchParams.toString(), {
    skip: !searchParams.toString(),
  })


  const { data: cars, isFetching: isLoadingCars } = useGetCarsQuery(carsId && carsId.ids, {
    skip: carsId && !carsId.count,
  })



  //
  // if (!carsId) return <img src={require('./../../assets/img/preloader.gif')} alt=""/>
  //
  // if (carsId && !carsId.count) {
  //   return <div className={styles.notFound}>Не знайдено автомобілів за даними параметрами</div>
  // }
  //
  // if (carsId && carsId.count && !cars) {
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

  console.log('carsId', carsId)

  if (carsId && carsId.count && isLoadingCars) {
    return carsId.ids.map(carId => {
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
  }

  if (carsId && !carsId.count) {
    return (
      <>
        <div style={{textAlign: 'center'}}>
          <h3>На жаль, ми не знайши авто за вашим запитом</h3>
          <h4>Але ми підібрали схожі варіанти</h4>
        </div>

        {/*{*/}
        {/*  {*/}
        {/*    cars && cars.length && cars.map(car => {*/}
        {/*    return <CarListItem key={car.autoData.autoId} carData={car}/>*/}
        {/*  })*/}
        {/*}*/}
        {/*}*/}
      </>
    )
  }

  return (
    <>

      {
        isLoadingCarsId && <img src={require('./../../assets/img/preloader.gif')} alt="preloader"/>
      }

      {
        cars && cars.length && cars.map(car => {
          return <CarListItem key={car.autoData.autoId} carData={car}/>
        })
      }





      {
        carsId && carsId.count && !isLoadingCarsId &&
        <Pagination
          className={styles.pagination}
          pageSize={10}
          showSizeChanger={false}
          defaultCurrent={+objOfParams.page + 1}
          total={carsId.count}
          responsive={true}
          onChange={(page) => {
            // dispatch(setFilterPrams({type: 'PAGE', data: (page - 1).toString()}))
            setSearchParams({...objOfParams, page: (page - 1).toString()})
            window.scrollTo(0, 0)
          }}
        />
      }
   </>
  )
}