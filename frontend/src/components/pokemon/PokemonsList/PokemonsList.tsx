import { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { POKEMON_FAVORITE_MUTATION, POKEMON_UNFAVORITE_MUTATION } from '../mutations'
import { EntityDefault } from '../types'
import { PokemonsListCard } from './PokemonsListCard'
import styles from './styles.module.scss'

export const PokemonsList = <Entity extends EntityDefault>({
  data,
}: {
  data: Entity[]
}) => {
  // TODO: move to a separate custom hook
  // Pretending this is also a working optimistic ui implementation (haven't tested it)
  const [setFavorite] = useMutation(POKEMON_FAVORITE_MUTATION, {
    // Is there a better way to do this, e.g. enums? I couldn't interpolate the query name
    // from an enum without getting errors since I'm autogenerating types
    refetchQueries: ['GetPokemonList'],
  })
  const [setUnfavorite] = useMutation(POKEMON_UNFAVORITE_MUTATION, {
    refetchQueries: ['GetPokemonList'],
  })

  const handleFavoriteClick = useCallback(
    (entity: Entity) => () => {
      if (!entity.isFavorite) {
        setFavorite({ variables: { pokemonId: entity.id } })
      } else {
        setUnfavorite({ variables: { pokemonId: entity.id } })
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
