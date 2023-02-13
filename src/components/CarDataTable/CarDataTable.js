import styles from './CarDataTable.module.css'
import {Descriptions} from "antd";
import {MoneyBlock} from "../CarList/CarListItem/MoneyBlock/MoneyBlock";
import dateFormat from "dateformat";
export const CarDataTable = ({carData}) => {
  const colorItem = (colorData) => {
    return (
      <div className={styles.colorWrapper}>
        <div className={styles.colorIcon} style={{background: colorData.hex}}></div>
        <div className={styles.colorText}>{ colorData.name }</div>
      </div>
    )
  }

  const tabelData = [
    { label: 'Ціна', value: <MoneyBlock necessaryData={carData} status={'CARPAGE'}/> },
    { label: 'Дата публікації', value: dateFormat(new Date(carData.addDate), "dd.mm.yyyy HH:MM") },
    { label: 'Рік випуску', value: carData.year },
    { label: 'Пробіг', value: carData.badges.race },
    { label: 'Двигун', value: carData.badges.fuelName },
    { label: 'Коробка передач', value: carData.badges.gearboxName },
    { label: 'Місто', value: carData.badges.locationCityName },
    { label: 'Колір', value: colorItem(carData.color) },
    { label: 'Номер', value: carData.plateNumber },
    { label: 'VIN-код', value: carData.VIN },
    { label: 'Особливості', value: carData.infoBarText },
    { label: 'Опис', value: carData.description },
  ]

  return (
    <Descriptions
      title="Інформація про автомобіль"
      bordered
      column={1}
      labelStyle={{width: '25%'}}
    >
      {
        tabelData.map(item => {
          return <Descriptions.Item key={item.label} label={item.label}>{ item.value }</Descriptions.Item>
        })
      }
      {/*<Descriptions.Item label="Product">Cloud Database</Descriptions.Item>*/}
      {/*<Descriptions.Item label="Amount">$80.00</Descriptions.Item>*/}
      {/*<Descriptions.Item label="Config Info">*/}
      {/*  Data disk type: MongoDB*/}
      {/*</Descriptions.Item>*/}
    </Descriptions>
  )
}