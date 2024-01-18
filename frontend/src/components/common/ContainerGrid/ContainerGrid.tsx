import { Grid } from '@carbon/react'
import styles from './styles.module.scss'

export const ContainerGrid = ({ children }: { children: React.ReactNode }) => {
  // Ugly hack to inherit every grid's style
  return <Grid className={styles.ContainerGrid}>{children}</Grid>
}
