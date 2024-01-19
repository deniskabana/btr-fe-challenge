export enum PokemonFilterType {
  ALL = 'all',
  FAVORITES = 'favorites',
}

export enum PokemonViewOptions {
  GRID = 'grid',
  LIST = 'list',
}

export type EntityDefault = {
  id: string
  image: string
  isFavorite?: boolean
  name: string
  types?: string[]
} & { [key: string]: unknown }
