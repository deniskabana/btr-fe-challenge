import TEXT from '@/constants/TEXT'
import { useDarkTheme } from '@/context/DarkThemeContext'
import { DataEnrichment, AsleepFilled } from '@carbon/icons-react'
import { Button } from '@carbon/react'

type DarkModeToggleButtonProps = {
  className?: string
}

export const DarkModeToggleButton = ({ className }: DarkModeToggleButtonProps) => {
  const { darkMode, toggleDarkMode } = useDarkTheme()
  return (
    <Button
      kind="secondary"
      size="sm"
      className={className}
      onClick={toggleDarkMode}
      aria-label={TEXT.ui.setDarkMode}
      renderIcon={darkMode ? DataEnrichment : AsleepFilled}
    >
      {darkMode ? TEXT.ui.setLightMode : TEXT.ui.setDarkMode}
    </Button>
  )
}
