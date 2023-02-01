import {CarListItem} from "./CarListItem/CarListItem";
import {useParams} from "react-router";
import {useGetCarsIdQuery, useGetCarsQuery} from "../../store/queries/autoRiaApi";
import {useEffect, useMemo, useState} from "react";
import {Pagination} from "antd";
import styles from './CarList.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setFilteringQueryString, setFilterPrams} from "../../store/filters/filtersSlice";
import {useSearchParams} from "react-router-dom";

export const CarList = () => {
  const dispatch = useDispatch()
  // const {params} = useParams()

  const [searchParams, setSearchParams] = useSearchParams()
  console.log('PARAM', searchParams.toString())

  // setSearchParams({aaaa: 'ddddd'})


  // console.log('PARAM', params.split('&').map(item => {
  //   const arr = item.split('=')
  //   return {[arr[0]]: arr[1]}
  // }))

  const page = useSelector(state => state.filters.filteringParams.page)

  useEffect(() => {
    dispatch(setFilteringQueryString())
  }, [page])

  const { carsId , isLoading, isError } = useGetCarsIdQuery(`${searchParams.toString()}`, {
    skip: !searchParams.toString(),
    selectFromResult: ({ data }) => ({
      carsId: data,
    }),
  })


  const { cars, isLoading: isLoadingCars} = useGetCarsQuery(carsId && carsId.ids, {
    skip: !carsId,
    selectFromResult: ({ data }) => ({
      cars: data,
    }),
  })



  useMemo(() => {
    if(cars) {
      console.log('CARS', cars)
    }
  },[cars])

  return (
    <>
      {
        isLoading && <div>Loading new cars...</div>
      }
      {
        carsId && carsId.ids.length &&
        <div>
          {
            cars && cars.length
              ?
              // <CarListItem carData={cars[4]} />
              cars.map(car => {
                return <CarListItem key={car.autoData.autoId} carData={car}/>
              })
              :
              <div>Не знайдено автомобілі за даним запитом</div>
          }


          <Pagination
            className={styles.pagination}
            pageSize={10}
            showSizeChanger={false}
            defaultCurrent={+page + 1}
            total={carsId.count}
            responsive={true}
            onChange={(page) => {
              dispatch(setFilterPrams({type: 'PAGE', data: (page - 1).toString()}))
            }}
          />
        </div>
      }
    </>
  )
}