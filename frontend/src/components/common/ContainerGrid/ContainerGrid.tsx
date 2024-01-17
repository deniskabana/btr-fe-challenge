import { Grid } from '@carbon/react'
import styles from './styles.module.scss'

export const ContainerGrid = ({ children }: { children: React.ReactNode }) => {
  return <Grid className={styles.ContainerGrid}>{children}</Grid>
}
