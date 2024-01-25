import { Pokemon } from '@/__generated__/graphql'
import TEXT from '@/config/TEXT'
import { PokemonsListCard } from '../../common/PokemonsList/PokemonsListCard'
import styles from './styles.module.scss'

export type PokemonDetailEvolutionsProps = {
  data: Pokemon['evolutions']
}

export const PokemonDetailEvolutions = ({ data }: PokemonDetailEvolutionsProps) => {
  return (
    <>
      {data.length ? (
        <div className={styles.Evolutions}>
          {data.map((evolution) => (
            <PokemonsListCard
              key={evolution.id}
              entity={evolution}
              // No need to re-implement this logic twice
              handleFavoriteClick={() => {}}
            />
          ))}
        </div>
      ) : (
        <p>{TEXT.details.pokemon.evolutions.noData}</p>
      )}
    </>
  )
}
