import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import TEXT from '@/constants/TEXT'
import { Tabs, TabList, Tab, Loading, Button } from '@carbon/react'
import { EntityGrid } from '@/components/common/EntityGrid/EntityGrid'
import { useDarkTheme } from '@/context/DarkThemeContext'
import { AsleepFilled, DataEnrichment } from '@carbon/icons-react'
import { debounce } from '@/utils/debounce'
import { SCROLL_DEBOUNCE, SCROLL_THRESHOLD } from '@/constants/infiniteScroll'
import { FILTER_TYPE_OPTIONS, PokemonFilter } from '../PokemonFilter/PokemonFilter'
import { GET_POKEMONS_QUERY } from './query'
import { FilterForm, POKEMON_TYPE_UNSET, filterFormDefaults } from './forms'
import { PokemonFilterType } from './types'
import styles from './styles.module.scss'

export const PokemonListView = () => {
  const { darkMode, toggleDarkMode } = useDarkTheme()
  const { loading, error, data, refetch, fetchMore } = useQuery(GET_POKEMONS_QUERY)
  const [filter, setFilter] = useState<FilterForm>(filterFormDefaults)

  const pokemonData = data?.pokemons.edges

  /**
   * Error handling
   */
  useEffect(() => {
    if (!loading && error) {
      // toast.error('Error 🥺')
    }
  }, [loading, error])

  /**
   * Infinite scroll
   * My first ever implementation of this anti-UX pattern 😅
   * PS: Didn't implement faux pagination to remember the last scroll position
   * and last displayed Pokemons
   */
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

  /**
   * Refetch upon filter change
   */
  useEffect(() => {
    // TODO: Implement cache handling - either official or custom
    // - official: https://www.apollographql.com/docs/react/caching/overview
    // - unofficial: Record<CacheType, Pokemon[]> = {}
    //   - CacheType = [isFavorite, type, search].sort().join('')
    refetch({
      filter: {
        isFavorite: filter.pokemonType === PokemonFilterType.FAVORITES || undefined,
        type: filter.pokemonType === POKEMON_TYPE_UNSET ? undefined : filter.pokemonType,
      },
      search: filter.search || undefined,
    })
  }, [filter, refetch])

  const handleTabChange = useCallback(
    (choice: PokemonFilterType) => (_e: React.SyntheticEvent) => {
      refetch({ filter: { isFavorite: choice === PokemonFilterType.FAVORITES } })
    },
    [refetch],
  )

  return (
    <>
      {/* Would've handled this one better in real-world app 🤞 */}
      {loading && <Loading withOverlay={false} />}

      {pokemonData && (
        <>
          <div className={styles.Title}>
            <strong>{TEXT.filters.pokemon.title}</strong>
            <Button
              kind="tertiary"
              size="sm"
              className={styles.Button}
              onClick={toggleDarkMode}
              aria-label={TEXT.ui.setDarkMode}
              renderIcon={darkMode ? DataEnrichment : AsleepFilled}
            >
              {darkMode ? TEXT.ui.setLightMode : TEXT.ui.setDarkMode}
            </Button>
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

            <EntityGrid<(typeof pokemonData)[0]> data={data.pokemons.edges} />
          </div>
        </>
      )}
    </>
  )
}
