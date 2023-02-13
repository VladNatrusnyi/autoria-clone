import styles from './MoneyBlock.module.css'
import {moneyFormatter} from "../../../../helpers/moneyFormatter";
import {useWindowDimensions} from "../../../../customHooks/useWindowDimensions";

export const MoneyBlock = ({necessaryData, status='DEFAULT'}) => {

  const { width, height } = useWindowDimensions();


  return (
    <div className={`${styles.price} ${(status === 'CARPAGE' && width < 450) && styles.forCar}`}>
      <p className={styles.priceDollar}>
        {moneyFormatter('USD', necessaryData.prise.USD)}
      </p>
      <div className={styles.priseDecor}></div>
      <p className={styles.priceUAN}>
        {moneyFormatter('UAH', necessaryData.prise.UAH)}
      </p>
    </div>
  )
}