import styles from "./Race.module.css";
import {InputNumber, Select} from "antd";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export const Race = ({onChangeRace}) => {

  const {raceFrom, raceTo} = useSelector(state => state.filters.filteringParams)

  const race = { raceFrom, raceTo }

  useEffect(() => {
    const a = setTimeout(() => {
      if (raceFrom && raceTo && raceTo < raceFrom) {
        const value = {...race, raceFrom: raceTo, raceTo: raceFrom }
        onChangeRace(value, 'change')
      }
    },2000);

    return () => clearTimeout(a)
  }, [race])

  const onChangeRaceFrom = (value) => {
    onChangeRace({...race, raceFrom: value}, 'raceFrom')
  };

  const onChangeRaceTo = (value) => {
    onChangeRace({...race, raceTo: value}, 'raceTo')
  };


  return (
    <div className={styles.wrapper}>

      <div className={styles.inputGroup}>
        <InputNumber
          placeholder="Від"
          style={{ width: 100, textAlign: 'center', fontSize: 12}}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          min={0}
          onChange={onChangeRaceFrom}
          value={raceFrom}
        />

        <p className={styles.separator}>-</p>

        <InputNumber
          placeholder="До"
          className="site-input-right"
          style={{
            width: 100,
            textAlign: 'center',
            fontSize: 12
          }}
          min={0}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          onChange={onChangeRaceTo}
          value={raceTo}
        />
      </div>
    </div>
  )
}