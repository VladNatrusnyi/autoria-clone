import {Brand} from "../Brand/Brand";
import {Model} from "../Model/Model";
import {SidebarFilterBlock} from "../../UI/SidebarFilterBlock/SidebarFilterBlock";

import styles from './SidebarMarkaFilter.module.css'
import {
  deleteMarkBlock,
  setFilteringQueryString,
  setFilterPrams
} from "../../../store/filters/filtersSlice";
import {useDispatch} from "react-redux";
import {Years} from "../Years/Years";
import {Button} from "antd";

export const SidebarMarkaFilter = ({markFilterId, onChangeMarka, onChangeModel, onChangeYears}) => {
  const dispatch = useDispatch()

  const repeatSearch = () => {
    dispatch(setFilterPrams({type: 'PAGE', data: 0}))
    dispatch(setFilteringQueryString())
  }

  const deleteMark = () => {
    dispatch(deleteMarkBlock(markFilterId))
    repeatSearch()
  }


  return(
    <div className={styles.wrapper}>

      <SidebarFilterBlock title={'Марка'}>
        <Brand width={220} onChangeMarka={onChangeMarka}  markFilterId={markFilterId}/>
      </SidebarFilterBlock>

      <SidebarFilterBlock title={'Модель'}>
        <Model width={220} onChangeModel={onChangeModel} markFilterId={markFilterId}/>
      </SidebarFilterBlock>

      <SidebarFilterBlock title={'Рік'}>
        <Years onChangeYears={onChangeYears} markFilterId={markFilterId}/>
      </SidebarFilterBlock>

      {
        markFilterId !== 1 ?
          <div className={styles.deleteBtn}>
            <Button
              type="dashed"
              danger
              onClick={deleteMark}
            >
              Видалити
            </Button>
          </div>
          : null
      }

    </div>
  )
}