import { ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // I do not like doing this at provider-level...
        // I'm happy to receive feedback on how to decouple this from a specific
        // entity implementation.
        pokemons: {
          merge(existing, incoming) {
            return { ...existing, ...incoming }
          },
        },
      },
    },
  },
})

export const apollo = new ApolloClient({
  cache,
  uri: process.env.NEXT_PUBLIC_GQL_BACKEND_URL,
})
