import Head from 'next/head'
import { Column } from '@carbon/react'
import { PokemonListView } from '@/components/PokemonListView/PokemonListView'
import TEXT from '@/constants/TEXT'
import { ContainerGrid } from '@/components/common/ContainerGrid/ContainerGrid'

export default function Home() {
  return (
    <>
      <Head>
        <title>{TEXT.meta.appTitle}</title>
      </Head>
      <main>
        <ContainerGrid>
          <Column lg={16} md={8} sm={4}>
            <PokemonListView />
          </Column>
        </ContainerGrid>
      </main>
    </>
  )
}
