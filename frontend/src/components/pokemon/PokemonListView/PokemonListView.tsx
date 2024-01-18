import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { graphql } from '@/__generated__/gql'
import TEXT from '@/constants/TEXT'
import { Tabs, TabList, Tab, Loading } from '@carbon/react'
import { EntityGridView } from '@/components/common/EntityGridView/EntityGridView'
import styles from './styles.module.scss'
import { FILTER_TYPE_OPTIONS, PokemonFilter } from '../PokemonFilter/PokemonFilter'

const GET_POKEMONS = graphql(/* GraphQL */ `
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
`)

export const PokemonListView = () => {
  const { loading, error, data } = useQuery(GET_POKEMONS)
  const pokemonData = data?.pokemons.edges

  useEffect(() => {
    if (!loading && error) {
      // toast.error('Error 🥺')
    }
  }, [loading, error])

  return (
    <>
      {/* Would've handled this one better in real-world app */}
      {loading && <Loading withOverlay={false} />}

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

            <EntityGridView<(typeof pokemonData)[0]> data={data.pokemons.edges} />
          </div>
        </>
      )}
    </>
  )
}
