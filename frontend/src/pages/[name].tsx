import Head from 'next/head'
import TEXT from '@/config/TEXT'
import { ContainerGrid } from '@/components/common/ContainerGrid/ContainerGrid'
import { PokemonDetailView } from '@/components/pokemon/detail/PokemonDetailView/PokemonDetailView'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  const name = Array.isArray(router.query.name) ? router.query.name[0] : router.query.name

  return (
    <>
      <Head>
        <title>
          {TEXT.meta.appTitle} / {}
        </title>
      </Head>
      <main>
        <ContainerGrid>
          {name && name.length ? <PokemonDetailView name={decodeURI(name)} /> : null}
        </ContainerGrid>
      </main>
    </>
  )
}
