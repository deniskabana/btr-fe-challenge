import { DarkModeToggleButton } from '@/components/common/DarkModeToggleButton/DarkModeToggleButton'
import styles from './styles.module.scss'

export type PageTitleProps = {
  showDarkModeToggle?: boolean
  title: string
}

export const PageTitle = ({ title, showDarkModeToggle = true }: PageTitleProps) => {
  return (
    <div className={styles.Title}>
      <strong>{title}</strong>
      {showDarkModeToggle && <DarkModeToggleButton className={styles.Button} />}
    </div>
  )
}
