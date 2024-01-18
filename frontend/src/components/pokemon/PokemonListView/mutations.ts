import { graphql } from '@/__generated__'

export const POKEMON_FAVORITE_MUTATION = graphql(/* GraphQL */ `
  mutation Favorite($pokemonId: ID!) {
    favoritePokemon(id: $pokemonId) {
      id
      isFavorite
    }
  }
`)

export const POKEMON_UNFAVORITE_MUTATION = graphql(/* GraphQL */ `
  mutation Unfavorite($pokemonId: ID!) {
    unFavoritePokemon(id: $pokemonId) {
      id
      isFavorite
    }
  }
`)
