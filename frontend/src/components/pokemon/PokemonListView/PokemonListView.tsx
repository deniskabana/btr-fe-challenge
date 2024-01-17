import { gql, useQuery } from '@apollo/client'
import TEXT from '@/constants/TEXT'
import { Tabs, TabList, Tab } from '@carbon/react'
import { EntityGridView } from '@/components/common/EntityGridView/EntityGridView'
import styles from './styles.module.scss'
import { FILTER_TYPE_OPTIONS, PokemonFilter } from '../PokemonFilter/PokemonFilter'

// I think should be able to consume types like this from graphql/server 🤷‍♂️
// TODO: Pending graphql/server types implementation if I have enough time & mood
export type Pokemon = {
  id: string
  image: string
  isFavorite: boolean
  name: string
  types: string[]
}
const pokemonListFields: (keyof Pokemon)[] = [
  'id',
  'name',
  'image',
  'isFavorite',
  'types',
]

const GET_POKEMONS = gql`
  query getPokemonList {
    pokemons(query: { limit: 20, offset: 0 }) {
      edges {
        id
        name
        image
        isFavorite
        types
      }
    }
  }
`

export const PokemonListView = () => {
  const { loading, error, data: pokemonData } = useQuery(GET_POKEMONS)

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error 🥺</p>}
      {pokemonData && (
        <>
          <PokemonFilter />

          <div className={styles.PokemonContainer}>
            <div>
              <Tabs onChange={() => {}}>
                <TabList aria-label={TEXT.filters.pokemon.aria.tabList} contained>
                  {FILTER_TYPE_OPTIONS.map((value) => (
                    <Tab key={value}>{TEXT.filters.pokemon.tabs[value]}</Tab>
                  ))}
                </TabList>
              </Tabs>
            </div>

            <EntityGridView<Pokemon> data={pokemonData.pokemons.edges} />
          </div>
        </>
      )}
    </>
  )
}
