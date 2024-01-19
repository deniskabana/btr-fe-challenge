import { PokemonFilterType, PokemonViewOptions } from './types'

export const POKEMON_TYPE_UNSET = '__ALL_TYPES__'

export const filterFormDefaults = {
  filterType: PokemonFilterType.ALL,
  isFavorite: false,
  pokemonType: POKEMON_TYPE_UNSET,
  search: '',
  viewType: PokemonViewOptions.GRID,
}

export type FilterForm = typeof filterFormDefaults
