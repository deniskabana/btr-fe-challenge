import { gql, useQuery } from '@apollo/client'
import TEXT from '@/constants/TEXT'
import { Tabs, TabList, Tab } from '@carbon/react'
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

          <div>
            <div>
              <Tabs onChange={() => {}}>
                <TabList aria-label={TEXT.filters.pokemon.aria.tabList}>
                  {FILTER_TYPE_OPTIONS.map((value) => (
                    <Tab key={value}>{TEXT.filters.pokemon.tabs[value]}</Tab>
                  ))}
                </TabList>
              </Tabs>
            </div>

            <table className={styles.PokemonTable}>
              <thead>
                <tr>
                  {pokemonListFields.map((field) => (
                    <th key={field}>{field}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {pokemonData.pokemons.edges.map((pokemon: Pokemon) => (
                  <tr key={pokemon.id}>
                    {pokemonListFields.map((field) => (
                      <td key={field}>{JSON.stringify(pokemon[field], null, 2)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}
