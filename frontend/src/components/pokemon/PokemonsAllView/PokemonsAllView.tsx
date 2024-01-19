import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import TEXT from '@/constants/TEXT'
import { Tabs, TabList, Tab, Loading } from '@carbon/react'
import { useDarkTheme } from '@/context/DarkThemeContext'
import { debounce } from '@/utils/debounce'
import { SCROLL_DEBOUNCE, SCROLL_THRESHOLD } from '@/constants/infiniteScroll'
import { DarkModeToggleButton } from '@/components/common/DarkModeToggleButton/DarkModeToggleButton'
import { FILTER_TYPE_OPTIONS, PokemonFilter } from '../PokemonFilter/PokemonFilter'
import { GET_POKEMONS_QUERY } from '../query'
import { FilterForm, POKEMON_TYPE_UNSET, filterFormDefaults } from '../forms'
import { PokemonFilterType, PokemonViewOptions } from '../types'
import { PokemonsGrid } from '../PokemonsGrid/PokemonsGrid'
import styles from './styles.module.scss'
import { PokemonsList } from '../PokemonsList/PokemonsList'

export const PokemonAllView = () => {
  const { darkMode, toggleDarkMode } = useDarkTheme()
  const { loading, error, data, refetch, fetchMore } = useQuery(GET_POKEMONS_QUERY)
  const [filter, setFilter] = useState<FilterForm>(filterFormDefaults)

  const pokemonData = data?.pokemons.edges

  useEffect(() => {
    if (!loading && error) {
      // toast.error('Error 🥺')
    }
  }, [loading, error])

  // My first-ever infinite scroll implementation 🎉
  useLayoutEffect(() => {
    // SSR protection
    if (typeof window === 'undefined') return

    const onScroll = debounce(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement

      if (scrollTop + clientHeight >= scrollHeight - scrollHeight * SCROLL_THRESHOLD) {
        fetchMore({
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEntries = fetchMoreResult.pokemons.edges
            const oldEntries = previousResult.pokemons.edges
            return { pokemons: { edges: [...oldEntries, ...newEntries] } }
          },
          variables: { offset: data?.pokemons.edges.length },
        })
      }
    }, SCROLL_DEBOUNCE)

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [data?.pokemons.edges.length, fetchMore])

  useEffect(() => {
    // TODO: add a guard clause for when used filter values have not changed
    refetch({
      // Since `filter` object is used as a form data object, here I had to "Cinderella" the values
      filter: {
        isFavorite: filter.isFavorite,
        type: filter.pokemonType === POKEMON_TYPE_UNSET ? undefined : filter.pokemonType,
      },
      search: filter.search || undefined,
    })
  }, [filter, refetch])

  const handleTabChange = useCallback(
    (choice: PokemonFilterType) => (_e: React.SyntheticEvent) => {
      setFilter({ ...filter, isFavorite: choice === PokemonFilterType.FAVORITES })
    },
    [filter],
  )

  return (
    <>
      {/* Would've handled this one better in real-world app 🤞 */}
      {loading && <Loading withOverlay={false} />}

      <div className={styles.Title}>
        <strong>{TEXT.filters.pokemon.title}</strong>
        <DarkModeToggleButton className={styles.Button} />
      </div>

      <PokemonFilter filter={filter} setFilter={setFilter} />

      <div className={styles.PokemonContainer}>
        <div>
          <Tabs>
            <TabList aria-label={TEXT.filters.pokemon.aria.tabList} contained>
              {FILTER_TYPE_OPTIONS.map((value) => (
                <Tab key={value} onClick={handleTabChange(value)}>
                  {TEXT.filters.pokemon.tabs[value]}
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </div>

        {pokemonData && pokemonData.length ? (
          filter.viewType === PokemonViewOptions.GRID ? (
            <PokemonsGrid<(typeof pokemonData)[0]> data={data.pokemons.edges} />
          ) : (
            <PokemonsList<(typeof pokemonData)[0]> data={data.pokemons.edges} />
          )
        ) : null}
        {!pokemonData?.length ? (
          <div className={styles.NoResults}>
            {filter.isFavorite
              ? TEXT.filters.pokemon.noFavorites
              : TEXT.filters.pokemon.noResults}
          </div>
        ) : null}
      </div>
    </>
  )
}
