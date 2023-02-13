import {useGetCarImagesQuery, useGetCarsQuery, useGetCurrentCarQuery} from "../../store/queries/autoRiaApi";
import {useParams} from "react-router";
import styles from './CarPage.module.css'
import {PhotoSlider} from "../../components/UI/PhotoSlider/PhotoSlider";
import {PreloaderCar} from "../../components/UI/PreloaderCar/PreloaderCar";
import {CarDataTable} from "../../components/CarDataTable/CarDataTable";

export const CarPage = () => {

  const {carId} = useParams()

  const { data, isLoading, isError } = useGetCurrentCarQuery(carId, {
    skip: !carId,
  })

  const carData = data && {
    autoId: data.autoData.autoId,
    mainImg: data.photoData.seoLinkB,
    title: data.title,
    prise: {
      EUR: data.EUR,
      UAH: data.UAH,
      USD: data.USD,
    },
    badges: {
      fuelName: data.autoData.fuelName,
      gearboxName: data.autoData.gearboxName,
      race: data.autoData.race,
      locationCityName: data.locationCityName
    },
    plateNumber: data.plateNumber,
    VIN: data.VIN,
    addDate: data.addDate,
    infoBarText: data.infoBarText,
    description: data.autoData.description,
    isActive: data.autoData.active,
    color: data.color,
    year: data.autoData.year
  }

  const { data: images, isFetching: isLoadingCars } = useGetCarImagesQuery(carId, {
    skip: !carId,
  })

  const carImages = images && Object.keys(images.data[carId]).map(key => {
    const obj = images.data[carId]
    return obj[key].formats[0]
  })

  if (isLoadingCars) {
    return  <div className={styles.preloader}><PreloaderCar/></div>
  }

  return (
    <>
      {
        carData &&
        <div>
          <div className={styles.wrapper}>
            <h1>{carData.title}</h1>
            {
              carImages &&
              <PhotoSlider carImages={carImages} isActive={carData.isActive}/>
            }
          </div>
          <br/>
          <CarDataTable carData={carData}/>
          <br/>
          <br/>
        </div>
      }
    </>
  )
}