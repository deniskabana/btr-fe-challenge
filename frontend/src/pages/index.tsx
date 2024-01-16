import Head from 'next/head'
import { Grid, Column } from '@carbon/react'
import { PokemonListView } from '@/components/PokemonListView/PokemonListView'
import TEXT from '@/constants/TEXT'

export default function Home() {
  return (
    <>
      <Head>
        <title>{TEXT.meta.appTitle}</title>
      </Head>
      <main>
        <Grid className="landing-page" fullWidth>
          <Column lg={16} md={8} sm={4}>
            <PokemonListView />
          </Column>
        </Grid>
      </main>
    </>
  )
}
