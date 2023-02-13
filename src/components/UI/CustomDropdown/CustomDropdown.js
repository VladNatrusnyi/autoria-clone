import styles from './CustomDropdown.module.css'
import {useEffect, useRef, useState} from "react";
export const CustomDropdown = (props) => {

  const [isOpen, setIsOpen] = useState(false)
  const [isShowBtn, setIsShowBtn] = useState(false)
  const [height, setHeight] = useState(0)


  const btnText = isOpen ? 'Сховати' : 'Показати'

  const blockRef = useRef(null);

  useEffect(() => {
    if (blockRef.current.offsetHeight > 87) {
      setHeight(68)
      setIsShowBtn(true)
    } else {
      setHeight(blockRef.current.offsetHeight)
    }
  }, []);

  return (
    <>
      <div
        className={`${styles.wrapper} ${isOpen && styles.active}` }
        style={{height: height}}
      >
        <div ref={blockRef}>
          {props.children}
        </div>
      </div>
      {
        isShowBtn ?
          <div onClick={() => setIsOpen((state) => !state)} className={styles.showButton}>
            <div>{btnText}</div>
            {
              isOpen
                ? <i className="bi bi-caret-up-fill"></i>
                : <i className="bi bi-caret-down-fill"></i>
            }
          </div>
          : null
      }
    </>
  )
}
