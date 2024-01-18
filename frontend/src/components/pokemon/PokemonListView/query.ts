import { graphql } from '@/__generated__/gql'

export const GET_POKEMONS_QUERY = graphql(/* GraphQL */ `
  query GetPokemonList($limit: Int = 20, $offset: Int, $search: String, $filter: PokemonFilterInput) {
    pokemons(query: { limit: $limit, offset: $offset, search: $search, filter: $filter }) {
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

export const GET_POKEMON_TYPES_QUERY = graphql(/* GraphQL */ `
  query GetPokemonTypes {
    pokemonTypes
  }
`)
