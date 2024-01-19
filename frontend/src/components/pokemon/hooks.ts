import { useMutation } from '@apollo/client'
import { POKEMON_FAVORITE_MUTATION, POKEMON_UNFAVORITE_MUTATION } from './mutations'

export const usePokemonFavoriteMutations = () => {
  // Pretending this is also a working optimistic ui implementation (haven't tested it)
  const [setFavorite] = useMutation(POKEMON_FAVORITE_MUTATION, {
    // Is there a better way to do this, e.g. enums? I couldn't interpolate the query name
    // from an enum without getting errors since I'm autogenerating types
    refetchQueries: ['GetPokemonList'],
  })
  const [setUnfavorite] = useMutation(POKEMON_UNFAVORITE_MUTATION, {
    refetchQueries: ['GetPokemonList'],
  })

  return [setFavorite, setUnfavorite]
}
