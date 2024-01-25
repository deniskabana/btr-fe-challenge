/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Favorite($pokemonId: ID!) {\n    favoritePokemon(id: $pokemonId) {\n      id\n      isFavorite\n    }\n  }\n": types.FavoriteDocument,
    "\n  mutation Unfavorite($pokemonId: ID!) {\n    unFavoritePokemon(id: $pokemonId) {\n      id\n      isFavorite\n    }\n  }\n": types.UnfavoriteDocument,
    "\n  query GetPokemonList(\n    $limit: Int = 20\n    $offset: Int\n    $search: String\n    $filter: PokemonFilterInput\n  ) {\n    pokemons(\n      query: { limit: $limit, offset: $offset, search: $search, filter: $filter }\n    ) {\n      edges {\n        id\n        name\n        image\n        isFavorite\n        types\n      }\n    }\n  }\n": types.GetPokemonListDocument,
    "\n  query GetPokemonByName($name: String!) {\n    pokemonByName(name: $name) {\n      id\n      number\n      name\n      weight {\n        minimum\n        maximum\n      }\n      height {\n        minimum\n        maximum\n      }\n      classification\n      types\n      resistant\n      attacks {\n        fast {\n          name\n          type\n          damage\n        }\n        special {\n          name\n          type\n          damage\n        }\n      }\n      weaknesses\n      fleeRate\n      maxCP\n      evolutions {\n        id\n        name\n        image\n      }\n      evolutionRequirements {\n        amount\n        name\n      }\n      maxHP\n      image\n      sound\n      isFavorite\n    }\n  }\n": types.GetPokemonByNameDocument,
    "\n  query GetPokemonTypes {\n    pokemonTypes\n  }\n": types.GetPokemonTypesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Favorite($pokemonId: ID!) {\n    favoritePokemon(id: $pokemonId) {\n      id\n      isFavorite\n    }\n  }\n"): (typeof documents)["\n  mutation Favorite($pokemonId: ID!) {\n    favoritePokemon(id: $pokemonId) {\n      id\n      isFavorite\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Unfavorite($pokemonId: ID!) {\n    unFavoritePokemon(id: $pokemonId) {\n      id\n      isFavorite\n    }\n  }\n"): (typeof documents)["\n  mutation Unfavorite($pokemonId: ID!) {\n    unFavoritePokemon(id: $pokemonId) {\n      id\n      isFavorite\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPokemonList(\n    $limit: Int = 20\n    $offset: Int\n    $search: String\n    $filter: PokemonFilterInput\n  ) {\n    pokemons(\n      query: { limit: $limit, offset: $offset, search: $search, filter: $filter }\n    ) {\n      edges {\n        id\n        name\n        image\n        isFavorite\n        types\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPokemonList(\n    $limit: Int = 20\n    $offset: Int\n    $search: String\n    $filter: PokemonFilterInput\n  ) {\n    pokemons(\n      query: { limit: $limit, offset: $offset, search: $search, filter: $filter }\n    ) {\n      edges {\n        id\n        name\n        image\n        isFavorite\n        types\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPokemonByName($name: String!) {\n    pokemonByName(name: $name) {\n      id\n      number\n      name\n      weight {\n        minimum\n        maximum\n      }\n      height {\n        minimum\n        maximum\n      }\n      classification\n      types\n      resistant\n      attacks {\n        fast {\n          name\n          type\n          damage\n        }\n        special {\n          name\n          type\n          damage\n        }\n      }\n      weaknesses\n      fleeRate\n      maxCP\n      evolutions {\n        id\n        name\n        image\n      }\n      evolutionRequirements {\n        amount\n        name\n      }\n      maxHP\n      image\n      sound\n      isFavorite\n    }\n  }\n"): (typeof documents)["\n  query GetPokemonByName($name: String!) {\n    pokemonByName(name: $name) {\n      id\n      number\n      name\n      weight {\n        minimum\n        maximum\n      }\n      height {\n        minimum\n        maximum\n      }\n      classification\n      types\n      resistant\n      attacks {\n        fast {\n          name\n          type\n          damage\n        }\n        special {\n          name\n          type\n          damage\n        }\n      }\n      weaknesses\n      fleeRate\n      maxCP\n      evolutions {\n        id\n        name\n        image\n      }\n      evolutionRequirements {\n        amount\n        name\n      }\n      maxHP\n      image\n      sound\n      isFavorite\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPokemonTypes {\n    pokemonTypes\n  }\n"): (typeof documents)["\n  query GetPokemonTypes {\n    pokemonTypes\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;