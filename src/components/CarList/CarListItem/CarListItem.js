import styles from './CarListItem.module.css'
import {moneyFormatter} from "../../../helpers/moneyFormatter";
import dateFormat from "dateformat";
import {CarNumber} from "../../UI/CarNumber/CarNumber";
import {VinCode} from "../../UI/VinCode/VinCode";
import {InfoBar} from "../../UI/InfoBar/InfoBar";
import {Tooltip} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router";
import {MoneyBlock} from "./MoneyBlock/MoneyBlock";
export const CarListItem = ({carData}) => {
  const navigate = useNavigate()

  const [isOpenDescription, setIsOpenDescription] = useState(false)

  const necessaryData = {
    autoId: carData.autoData.autoId,
    mainImg: carData.photoData.seoLinkB,
    title: carData.title,
    prise: {
      EUR: carData.EUR,
      UAH: carData.UAH,
      USD: carData.USD,
    },
    badges: {
      fuelName: carData.autoData.fuelName,
      gearboxName: carData.autoData.gearboxName,
      race: carData.autoData.race,
      locationCityName: carData.locationCityName
    },
    plateNumber: carData.plateNumber,
    VIN: carData.VIN,
    addDate: carData.addDate,
    infoBarText: carData.infoBarText,
    description: carData.autoData.description,
    isActive: carData.autoData.active
  }


  const goToCarPage = () => {
    navigate(`/car/${necessaryData.autoId}`)
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.imgBlock} onClick={goToCarPage}>
        <img src={necessaryData.mainImg} alt="car photo"/>
        { !necessaryData.isActive && <p><span>Продано</span></p>}
      </div>

      <div className={styles.infoBlock}>
        <div>
          <p className={styles.title} onClick={goToCarPage}>
            {necessaryData.title}
          </p>

          <MoneyBlock necessaryData={necessaryData}/>

          {/*<div className={styles.price}>*/}
          {/*  <p className={styles.priceDollar}>*/}
          {/*    {moneyFormatter('USD', necessaryData.prise.USD)}*/}
          {/*  </p>*/}
          {/*  <div className={styles.priseDecor}></div>*/}
          {/*  <p className={styles.priceUAN}>*/}
          {/*    {moneyFormatter('UAH', necessaryData.prise.UAH)}*/}
          {/*  </p>*/}
          {/*</div>*/}


          <div className={styles.badgesWrapper}>
            <div className={styles.badge}>
              <i className="bi bi-speedometer2"
                 style={{color: 'red'}}>
              </i>
              <div>{necessaryData.badges.race}</div>
            </div>
            <div className={styles.badge}>
              <i className="bi bi-fuel-pump"
                 style={{color: 'red'}}>
              </i>
              <div>{necessaryData.badges.fuelName}</div>
            </div>
            <div className={styles.badge}>
              <i className="bi bi-geo-alt-fill"
                 style={{color: 'red'}}
              ></i>
              <div>{necessaryData.badges.locationCityName}</div>
            </div>
            <div className={styles.badge}>
              <i className="bi bi-gear"
                 style={{color: 'red'}}
              ></i>
              <div>{necessaryData.badges.gearboxName}</div>
            </div>
          </div>
          <div className={styles.uniqueNumbers}>
            {
              necessaryData.VIN &&
              <div className={styles.vinCode}>
                <VinCode value={necessaryData.VIN}/>
              </div>
            }
            {
              necessaryData.plateNumber &&
              <div className={styles.plateNumber}>
                <CarNumber value={necessaryData.plateNumber} />
              </div>
            }
            {
              necessaryData.infoBarText &&
              <div className={styles.roadAccident}>
                <InfoBar value={necessaryData.infoBarText}/>
              </div>
            }
          </div>
          <div
            className={`${styles.description} ${!isOpenDescription && styles.closed}`}
          >
            {
              !isOpenDescription ?
                <Tooltip
                  placement="bottomLeft"
                  title="Натисніть, щоб побачити весь опис"
                >
                <span onClick={() => setIsOpenDescription(true)}>
                  {necessaryData.description}
                </span>
                </Tooltip>
                :
                <div>{necessaryData.description}</div>
            }
          </div>
        </div>
        <div className={styles.date}>
          {dateFormat(new Date(necessaryData.addDate), "dd.mm.yyyy HH:MM")}
        </div>
      </div>
    </div>
  )
}