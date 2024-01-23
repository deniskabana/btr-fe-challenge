import { graphql } from '@/__generated__/gql'

export const GET_POKEMONS_QUERY = graphql(/* GraphQL */ `
  query GetPokemonList(
    $limit: Int = 20
    $offset: Int
    $search: String
    $filter: PokemonFilterInput
  ) {
    pokemons(
      query: { limit: $limit, offset: $offset, search: $search, filter: $filter }
    ) {
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

export const GET_POKEMON_BY_NAME_QUERY = graphql(/* GraphQL */ `
  query GetPokemonByName($name: String!) {
    pokemonByName(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      evolutions {
        id
        name
        image
      }
      evolutionRequirements {
        amount
        name
      }
      maxHP
      image
      sound
      isFavorite
    }
  }
`)
// now i remember why i disliked graphql lol 😅

export const GET_POKEMON_TYPES_QUERY = graphql(/* GraphQL */ `
  query GetPokemonTypes {
    pokemonTypes
  }
`)
