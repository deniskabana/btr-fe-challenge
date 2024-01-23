import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Loading } from '@carbon/react'
import toast from 'react-hot-toast'
import TEXT from '@/constants/TEXT'
import { GET_POKEMON_BY_NAME_QUERY } from '../query'
import { PageTitle } from '@/components/common/PageTitle/PageTitle'

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
      <PageTitle title={TEXT.filters.pokemon.title} />

      {/* Would've handled this one better in real-world app 🤞 */}
      {loading && <Loading withOverlay={true} />}

      <code>
        <pre>{JSON.stringify(pokemonData, null, 2)}</pre>
      </code>
    </>
  )
}
