import { useCallback } from 'react'
import TEXT from '@/config/TEXT'
import { VolumeUp } from '@carbon/icons-react'
import { Button } from '@carbon/react'

export const PokemonSoundBtn = ({ url }: { url: string }) => {
  const handleClick = useCallback(async () => {
    const audio = new Audio(url)
    await audio.play()
    audio.remove()
  }, [url])

  return (
    <Button
      kind="tertiary"
      size="md"
      hasIconOnly
      onClick={handleClick}
      iconDescription={TEXT.details.pokemon.playSound}
      aria-label={TEXT.details.pokemon.playSound}
    >
      <VolumeUp />
    </Button>
  )
}
