import styles from './SidebarFilterBlock.module.css'
export const SidebarFilterBlock = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  )
}