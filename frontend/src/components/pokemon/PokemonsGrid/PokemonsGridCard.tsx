import Link from 'next/link'
import { FavoriteFilled, Favorite } from '@carbon/icons-react'
import { Button } from '@carbon/react'
import Image from 'next/image'
import TEXT from '@/constants/TEXT'
import styles from './styles.module.scss'
import { EntityDefault } from '../types'
import { getPokemonDetailUrl } from '@/utils/getPokemonDetailUrl'

export type PokemonsGridCardProps = {
  entity: EntityDefault
  handleFavoriteClick: VoidFunction
}

export const PokemonsGridCard = ({
  entity,
  handleFavoriteClick,
}: PokemonsGridCardProps) => {
  return (
    <div className={styles.GridItem}>
      <Link href={getPokemonDetailUrl(entity.name)}>
        {/* TODO: ADD SHINE ANIMATION (METAL-LIKE) ON HOVER */}
        <div className={styles.Image}>
          <div className={styles.ImageOverlay}>{TEXT.pokemonList.overlay.viewDetail}</div>
          <Image
            fill
            style={{ objectFit: 'contain' }}
            sizes="25rem"
            priority={true}
            src={entity.image}
            alt={entity.name}
          />
        </div>
      </Link>

      <div className={styles.MetaWrapper}>
        <div>
          <Link
            href={getPokemonDetailUrl(entity.name)}
            className={styles.Name}
            tabIndex={-1}
          >
            {entity.name}
          </Link>
          <div className={styles.Types}>{entity.types?.join(', ') || <>&mdash;</>}</div>
        </div>

        <Button
          size="sm"
          hasIconOnly
          className={styles.FavoriteButton}
          onClick={handleFavoriteClick}
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
  )
}
