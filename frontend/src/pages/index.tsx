import Head from 'next/head'
import { PokemonAllView } from '@/components/pokemon/PokemonsAllView/PokemonsAllView'
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
          <PokemonAllView />
        </ContainerGrid>
      </main>
    </>
  )
}
