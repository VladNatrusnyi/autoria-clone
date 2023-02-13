import {Switch} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

import styles from './Condition.module.css'
import {useSelector} from "react-redux";

export const Condition = ({onChangeAutoRepairs, onChangeSoldAuto}) => {

  const auto_repairs = useSelector(state => state.filters.filteringParams.auto_repairs)
  const saledParam = useSelector(state => state.filters.filteringParams.saledParam)

  const onChange = (value) => {
    onChangeAutoRepairs(value)
  }

  const onChange2 = (value) => {
    onChangeSoldAuto(value)
  }


  return (
    <>
      <div className={styles.wrapper}>
        <Switch
          size="small"
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={auto_repairs}
          onChange={onChange}
        />
        <div className={styles.text}>Авто не на ходу</div>
      </div>

      <div className={styles.wrapper}>
        <Switch
          size="small"
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={saledParam === 2}
          onChange={onChange2}
        />
        <div className={styles.text}>Не показувати продані</div>
      </div>
    </>
  )
}