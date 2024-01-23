import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import TEXT from '@/constants/TEXT'
import { Tabs, TabList, Tab, Loading } from '@carbon/react'
import { debounce } from '@/utils/debounce'
import { SCROLL_DEBOUNCE, SCROLL_THRESHOLD } from '@/constants/infiniteScroll'
import toast from 'react-hot-toast'
import { PageTitle } from '@/components/common/PageTitle/PageTitle'
import { FILTER_TYPE_OPTIONS, PokemonFilter } from '../PokemonFilter/PokemonFilter'
import { GET_POKEMONS_QUERY } from '../query'
import { FilterForm, POKEMON_TYPE_UNSET, filterFormDefaults } from '../forms'
import { PokemonFavoritesDisplayOptions, PokemonDisplayOptions } from '../types'
import { PokemonsGrid } from '../PokemonsGrid/PokemonsGrid'
import styles from './styles.module.scss'
import { PokemonsList } from '../PokemonsList/PokemonsList'

export const PokemonsAllView = () => {
  const [filter, setFilter] = useState<FilterForm>(filterFormDefaults)
  const [favoritesViewType, setFavoritesViewType] =
    useState<PokemonFavoritesDisplayOptions>(PokemonFavoritesDisplayOptions.ALL)
  const { loading, error, data, refetch, fetchMore } = useQuery(GET_POKEMONS_QUERY)
  const pokemonData = data?.pokemons.edges

  useEffect(() => {
    if (loading) return
    if (error) toast.error(TEXT.filters.pokemon.toasts.error)
  }, [error, loading])

  // My first-ever infinite scroll implementation 🎉
  useLayoutEffect(() => {
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
        isFavorite: favoritesViewType === PokemonFavoritesDisplayOptions.FAVORITES,
        type: filter.pokemonType === POKEMON_TYPE_UNSET ? undefined : filter.pokemonType,
      },
      search: filter.search || undefined,
    })
  }, [favoritesViewType, filter, refetch])

  const handleTabChange = useCallback(
    (choice: PokemonFavoritesDisplayOptions) => (_e: React.SyntheticEvent) => {
      setFavoritesViewType(choice)
    },
    [],
  )

  return (
    <>
      <PageTitle title={TEXT.filters.pokemon.title} />

      {/* No skeletons this time, sorry carbon docs */}
      {loading && <Loading withOverlay={true} />}

      <PokemonFilter filter={filter} setFilter={setFilter} />

      <div className={styles.PokemonContainer}>
        <div>
          <Tabs
            selectedIndex={FILTER_TYPE_OPTIONS.findIndex((a) => a === favoritesViewType)}
          >
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
          filter.viewType === PokemonDisplayOptions.GRID ? (
            <PokemonsGrid<(typeof pokemonData)[0]> data={data.pokemons.edges} />
          ) : (
            <PokemonsList<(typeof pokemonData)[0]> data={data.pokemons.edges} />
          )
        ) : null}
        {!pokemonData?.length ? (
          <div className={styles.NoResults}>
            {favoritesViewType === PokemonFavoritesDisplayOptions.FAVORITES
              ? TEXT.filters.pokemon.noFavorites
              : TEXT.filters.pokemon.noResults}
          </div>
        ) : null}
      </div>
    </>
  )
}
