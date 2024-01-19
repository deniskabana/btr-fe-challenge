import { PokemonFavoritesDisplayOptions, PokemonDisplayOptions } from './types'

export const POKEMON_TYPE_UNSET = '__ALL_TYPES__'

export const filterFormDefaults = {
  filterType: PokemonFavoritesDisplayOptions.ALL,
  pokemonType: POKEMON_TYPE_UNSET,
  search: '',
  viewType: PokemonDisplayOptions.GRID,
}

export type FilterForm = typeof filterFormDefaults
