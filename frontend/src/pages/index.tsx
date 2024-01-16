import Head from 'next/head'
import { Grid, Column } from '@carbon/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>
      <main>
        <Grid className="landing-page" fullWidth>
          <Column lg={16} md={8} sm={4}>
            Hello world
          </Column>
        </Grid>
      </main>
    </>
  )
}
