export enum PokemonFavoritesDisplayOptions {
  ALL = 'all',
  FAVORITES = 'favorites',
}

export enum PokemonDisplayOptions {
  GRID = 'grid',
  LIST = 'list',
}

/** A type with a minimal sufficient overlap of Pokemon */
export type EntityDefault = {
  id: string
  image: string
  isFavorite?: boolean
  name: string
  types?: string[]
} & { [key: string]: unknown }
