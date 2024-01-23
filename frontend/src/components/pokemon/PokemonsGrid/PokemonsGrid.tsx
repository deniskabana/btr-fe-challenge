import { useCallback } from 'react'

import styles from './styles.module.scss'
import { PokemonsGridCard } from './PokemonsGridCard'
import { EntityDefault } from '../types'
import { usePokemonFavoriteMutations } from '../hooks'

export const PokemonsGrid = <Entity extends EntityDefault>({
  data,
}: {
  data: Entity[]
}) => {
  const [setFavorite, setUnfavorite] = usePokemonFavoriteMutations()

  const handleFavoriteClick = useCallback(
    (entity: Entity) => () => {
      if (!entity.isFavorite) {
        setFavorite(entity.id)
      } else {
        setUnfavorite(entity.id)
      }
    },
    [setFavorite, setUnfavorite],
  )

  // TODO: filter data by isFavorite if "My Favorites" view

  return (
    <div className={styles.EntityGridView}>
      <div className={styles.EntityGrid}>
        {data.map((entity) => (
          <PokemonsGridCard
            key={entity.id}
            entity={entity}
            handleFavoriteClick={handleFavoriteClick(entity)}
          />
        ))}
      </div>
    </div>
  )
}
