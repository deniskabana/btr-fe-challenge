import { useCallback } from 'react'
import { EntityDefault } from '../../types'
import { PokemonsListCard } from './PokemonsListCard'
import styles from './styles.module.scss'
import { usePokemonFavoriteMutations } from '../../hooks'

export const PokemonsList = <Entity extends EntityDefault>({
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
  return (
    <div className={styles.EntityListView}>
      <div className={styles.EntityList}>
        {data.map((entity) => (
          <PokemonsListCard
            key={entity.id}
            entity={entity}
            handleFavoriteClick={handleFavoriteClick(entity)}
          />
        ))}
      </div>
    </div>
  )
}
