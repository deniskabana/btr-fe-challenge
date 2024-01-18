import TEXT from '@/constants/TEXT'
import styles from './styles.module.scss'

export type E = {
  id: string | number
  image: string
  isFavorite?: boolean
  name: string
  types?: string[]
} & { [key: string]: unknown }

export const EntityGridView = <Entity extends E = E>({ data }: { data: Entity[] }) => {
  return (
    <div className={styles.EntityGridView}>
      <div className={styles.EntityGrid}>
        {data.map((entity) => (
          <div key={entity.id} className={styles.GridItem}>
            <div className={styles.Image}>
              <div className={styles.ImageOverlay}>
                {TEXT.pokemonList.overlay.viewDetail}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={entity.image} alt={entity.name} />
            </div>
            <div>
              <div className={styles.Name}>{entity.name}</div>
              <div className={styles.Types}>
                {entity.types?.join(', ') || <>&mdash;</>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
