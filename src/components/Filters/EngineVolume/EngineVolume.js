import styles from "../Race/Race.module.css";
import {InputNumber} from "antd";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export const EngineVolume = ({onChangeEngineVolume}) => {

  const {engineVolumeFrom, engineVolumeTo} = useSelector(state => state.filters.filteringParams)

  const engineVolume = { engineVolumeFrom, engineVolumeTo }

  useEffect(() => {
    const a = setTimeout(() => {
      if (engineVolumeFrom && engineVolumeTo && engineVolumeTo < engineVolumeFrom) {
        const value = {...engineVolume, engineVolumeFrom: engineVolumeTo, engineVolumeTo: engineVolumeFrom }
        onChangeEngineVolume(value, 'change')
      }
    },2000);

    return () => clearTimeout(a)
  }, [engineVolume])

  const onChangeEngineVolumeFrom = (value) => {
    onChangeEngineVolume({...engineVolume, engineVolumeFrom: value}, 'engineVolumeFrom')
  };

  const onChangeEngineVolumeTo = (value) => {
    onChangeEngineVolume({...engineVolume, engineVolumeTo: value}, 'engineVolumeTo')
  };


  return (
    <div className={styles.wrapper}>

      <div className={styles.inputGroup}>
        <InputNumber
          placeholder="Від"
          style={{ width: 100, textAlign: 'center', fontSize: 12}}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          min={0}
          onChange={onChangeEngineVolumeFrom}
          value={engineVolumeFrom}
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
          onChange={onChangeEngineVolumeTo}
          value={engineVolumeTo}
        />
      </div>
    </div>
  )
}