import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Loading } from '@carbon/react'
import toast from 'react-hot-toast'
import TEXT from '@/config/TEXT'
import { PageTitle } from '@/components/common/PageTitle/PageTitle'
import { Pokemon } from '@/__generated__/graphql'
import { BreadcumbBackBtn } from '@/components/common/BreadcrumbBackBtn/BreadcrumbBackBtn'
import { PokemonDetailCard } from '../PokemonDetailCard/PokemonDetailCard'
import { GET_POKEMON_BY_NAME_QUERY } from '../../query'

export type PokemonDetailViewProps = {
  name: string
}

export const PokemonDetailView = ({ name }: PokemonDetailViewProps) => {
  const { loading, error, data } = useQuery(GET_POKEMON_BY_NAME_QUERY, {
    variables: { name },
  })
  const pokemonData = data?.pokemonByName

  useEffect(() => {
    if (loading) return

    if (error) toast.error(TEXT.filters.pokemon.toasts.error)
  }, [error, loading])

  return (
    <>
      <PageTitle title={TEXT.details.pokemon.title} />
      <BreadcumbBackBtn />

      {/* Would've handled this one better in real-world app 🤞 */}
      {loading && <Loading withOverlay={true} />}

      {/* I hate typecasting, but found no other way with my limited knowledge */}
      {pokemonData && <PokemonDetailCard data={pokemonData as Pokemon} />}
    </>
  )
}
