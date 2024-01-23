import Image from 'next/image'
import {
  SkillLevelBasic,
  Rule,
  DataCategorical,
  ChemistryReference,
  ArrowsVertical,
  LocationHeart,
  Flash,
} from '@carbon/icons-react'
import { ProgressBar } from '@carbon/react'
import { Pokemon } from '@/__generated__/graphql'
import styles from './styles.module.scss'
import { PokemonsGridCard } from '../../common/PokemonsGrid/PokemonsGridCard'
import TEXT from '@/config/TEXT'

export type PokemonDetailCardProps = {
  // Fuck statically typing TS+GQL :(
  data: Pokemon & {
    evolutions?: Partial<Pick<Pokemon, 'id' | 'name' | 'image'>>[]
  }
}

export const PokemonDetailCard = ({ data }: PokemonDetailCardProps) => {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.ImageWrapper}>
          <Image
            fill
            style={{ objectFit: 'contain' }}
            sizes="25rem"
            priority={true}
            src={data.image}
            alt={data.name}
          />
        </div>
        <div className={styles.MetaWrapper}>
          <h1 className={styles.PokemonName}>{data.name}</h1>
          <table className={styles.Table}>
            <tbody>
              <tr>
                <th>
                  <DataCategorical /> {TEXT.details.pokemon.card.types}
                </th>
                <td>{data.types.join(', ')}</td>
              </tr>
              <tr>
                <th>
                  <ChemistryReference /> {TEXT.details.pokemon.card.classification}
                </th>
                <td>{data.classification}</td>
              </tr>
              <tr>
                <th>
                  <Rule /> {TEXT.details.pokemon.card.resistantTo}
                </th>
                <td>{data.resistant?.join(', ')}</td>
              </tr>
              <tr>
                <th>
                  <SkillLevelBasic /> {TEXT.details.pokemon.card.weaknesses}
                </th>
                <td>{data.weaknesses?.join(', ')}</td>
              </tr>
              <tr>
                <th>
                  <ArrowsVertical /> {TEXT.details.pokemon.card.dimensions}
                </th>
                <td>
                  <strong>{TEXT.details.pokemon.card.height}:</strong>{' '}
                  {data.height.minimum} - {data.height.maximum}
                  <br />
                  <strong>{TEXT.details.pokemon.card.weight}:</strong>{' '}
                  {data.weight.minimum} - {data.weight.maximum}
                </td>
              </tr>
              <tr>
                <th>
                  <LocationHeart /> {TEXT.details.pokemon.card.hp}
                </th>
                <td>
                  {data.maxHP}
                  <ProgressBar
                    hideLabel
                    label="HP"
                    value={data.maxHP}
                    className={styles.HPBar}
                    max={3300} // Guessing this one to save time
                    type="indented"
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <Flash /> {TEXT.details.pokemon.card.hp}
                </th>
                <td>
                  {data.maxCP}
                  <ProgressBar
                    hideLabel
                    label="CP"
                    value={data.maxCP}
                    className={styles.CPBar}
                    max={3300} // Guessing this one to save time
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.EvolutionsWrapper}>
        <h3>{TEXT.details.pokemon.evolutions.title}</h3>

        {data.evolutions?.length ? (
          <div className={styles.Evolutions}>
            {data.evolutions.map((evolution) => (
              <PokemonsGridCard
                key={evolution.id}
                entity={evolution}
                handleFavoriteClick={() => {}}
              />
            ))}
          </div>
        ) : (
          <p>{TEXT.details.pokemon.evolutions.noData}</p>
        )}
      </div>
    </>
  )
}
