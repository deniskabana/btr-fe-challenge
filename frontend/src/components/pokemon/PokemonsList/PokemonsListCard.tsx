import TEXT from '@/constants/TEXT'
import Link from 'next/link'
import { FavoriteFilled, Favorite } from '@carbon/icons-react'
import { Button } from '@carbon/react'
import Image from 'next/image'
import styles from './styles.module.scss'
import { EntityDefault } from '../types'

export type PokemonsListCardProps = {
  entity: EntityDefault
  handleFavoriteClick: VoidFunction
}

export const PokemonsListCard = ({
  entity,
  handleFavoriteClick,
}: PokemonsListCardProps) => {
  return (
    <div className={styles.ListItem}>
      <Link href="#">
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

        <div className={styles.MetaWrapper}>
          <div>
            <div className={styles.Name} tabIndex={-1}>
              {entity.name}
            </div>
            <div className={styles.Types}>{entity.types?.join(', ') || <>&mdash;</>}</div>
          </div>
        </div>
      </Link>

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
  )
}
