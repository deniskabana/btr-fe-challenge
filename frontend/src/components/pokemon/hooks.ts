import { useMutation } from '@apollo/client'
import toast from 'react-hot-toast'
import TEXT from '@/constants/TEXT'
import { POKEMON_FAVORITE_MUTATION, POKEMON_UNFAVORITE_MUTATION } from './mutations'

export const usePokemonFavoriteMutations = () => {
  // Pretending this is also a working optimistic ui implementation (haven't tested it)
  const [setFavorite, { loading: loadingSet, error: errorSet }] = useMutation(
    POKEMON_FAVORITE_MUTATION,
    {
      // Is there a better way to do this, e.g. enums? I couldn't interpolate the query name
      // from an enum without getting errors since I'm autogenerating types
      refetchQueries: ['GetPokemonList'],
    },
  )
  const [setUnfavorite, { loading: loadingUnset, error: errorUnset }] = useMutation(
    POKEMON_UNFAVORITE_MUTATION,
    {
      refetchQueries: ['GetPokemonList'],
    },
  )

  const exposedSet = (pokemonId: string) => {
    const promise = setFavorite({ variables: { pokemonId } })
    toast.promise(promise, {
      error: TEXT.favorites.toasts.setError,
      loading: TEXT.favorites.toasts.setPending,
      success: TEXT.favorites.toasts.setSuccess,
    })
  }
  const exposedUnset = (pokemonId: string) => {
    const promise = setUnfavorite({ variables: { pokemonId } })
    toast.promise(promise, {
      error: TEXT.favorites.toasts.unsetError,
      loading: TEXT.favorites.toasts.unsetPending,
      success: TEXT.favorites.toasts.unsetSuccess,
    })
  }

  return [exposedSet, exposedUnset]
}
