import { ArrowLeft } from '@carbon/icons-react'
import Link from 'next/link'
import styles from './styles.module.scss'

// For future-proofing, add props and set sane defaults + allow either custom links or
// links from ENUMs only.

export const BreadcumbBackBtn = () => {
  return (
    <div className={styles.Buton}>
      <Link href="/" className={styles.Link}>
        <ArrowLeft className={styles.Icon} />
        Back to list
      </Link>
    </div>
  )
}
