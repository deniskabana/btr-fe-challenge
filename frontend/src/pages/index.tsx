import Head from 'next/head'
import { PokemonsAllView } from '@/components/pokemon/all/PokemonsAllView/PokemonsAllView'
import TEXT from '@/config/TEXT'
import { ContainerGrid } from '@/components/common/ContainerGrid/ContainerGrid'

export default function Home() {
  return (
    <>
      <Head>
        <title>{TEXT.meta.appTitle}</title>
      </Head>
      <main>
        <ContainerGrid>
          <PokemonsAllView />
        </ContainerGrid>
      </main>
    </>
  )
}
