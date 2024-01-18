import TEXT from '@/constants/TEXT'
import Link from 'next/link'
import { FavoriteFilled, Favorite } from '@carbon/icons-react'
import { useMutation } from '@apollo/client'
import {
  POKEMON_FAVORITE_MUTATION,
  POKEMON_UNFAVORITE_MUTATION,
} from '@/components/pokemon/PokemonLIstView/mutations'
import { Button } from '@carbon/react'
import styles from './styles.module.scss'

// This type of entity is accepted in EntityGrid
export type E = {
  id: string
  image: string
  isFavorite?: boolean
  name: string
  types?: string[]
} & { [key: string]: unknown }

export const EntityGrid = <Entity extends E = E>({ data }: { data: Entity[] }) => {
  // Pretending this is also a working optimistic ui implementation
  const [setFavorite] = useMutation(POKEMON_FAVORITE_MUTATION, {
    // Is there a better way to do this, e.g. enums? I couldn't interpolate the query name
    // from an enum without getting errors since I'm autogenerating types
    refetchQueries: ['GetPokemonList'],
  })
  const [setUnfavorite] = useMutation(POKEMON_UNFAVORITE_MUTATION, {
    refetchQueries: ['GetPokemonList'],
  })

  return (
    <div className={styles.EntityGridView}>
      <div className={styles.EntityGrid}>
        {data.map((entity) => (
          <div className={styles.GridItem} key={entity.id}>
            <Link as="button" href="#">
              <div className={styles.Image}>
                <div className={styles.ImageOverlay}>
                  {TEXT.pokemonList.overlay.viewDetail}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={entity.image} alt={entity.name} />
              </div>
            </Link>

            <div className={styles.MetaWrapper}>
              <div>
                <Link href="#" className={styles.Name} tabIndex={-1}>
                  {entity.name}
                </Link>
                <div className={styles.Types}>
                  {entity.types?.join(', ') || <>&mdash;</>}
                </div>
              </div>

              <Button
                size="sm"
                hasIconOnly
                className={styles.FavoriteButton}
                onClick={() => {
                  if (!entity.isFavorite) {
                    setFavorite({ variables: { pokemonId: entity.id } })
                  } else {
                    setUnfavorite({ variables: { pokemonId: entity.id } })
                  }
                }}
                iconDescription={
                  entity.isFavorite ? TEXT.favorites.unfavorite : TEXT.favorites.favorite
                }
                aria-label={
                  entity.isFavorite ? TEXT.favorites.unfavorite : TEXT.favorites.favorite
                }
              >
                {entity.isFavorite ? <FavoriteFilled /> : <Favorite />}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
