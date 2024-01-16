import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apollo = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_GQL_BACKEND_URL,
})
