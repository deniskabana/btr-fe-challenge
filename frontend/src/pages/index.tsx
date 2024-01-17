import Head from 'next/head'
import { PokemonListView } from '@/components/pokemon/PokemonListView/PokemonListView'
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
          <PokemonListView />
        </ContainerGrid>
      </main>
    </>
  )
}
