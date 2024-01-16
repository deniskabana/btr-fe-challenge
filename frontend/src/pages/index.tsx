import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import { Grid, Column } from '@carbon/react'

const GET_POKEMONS = gql`
  query GetPokemonsList {
    pokemons {
      edges {
        id
        name
        image
        isFavorite
        types
      }
    }
  }
`

export default function Home() {
  const { loading, error, data } = useQuery(GET_POKEMONS)

  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>
      <main>
        <Grid className="landing-page" fullWidth>
          <Column lg={16} md={8} sm={4}>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error 🥺</p>}
            {data && <strong>Check console, pokemons loaded!</strong>}
          </Column>
        </Grid>
      </main>
    </>
  )
}
