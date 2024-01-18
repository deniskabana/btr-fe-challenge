import { useEffect, useState } from 'react'
import { Theme } from '@carbon/react'
import { DarkThemeContext } from '@/context/DarkThemeContext'
import styles from './styles.module.scss'

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [isDark, setIsDark] = useState(userPrefersDark)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const setQuery = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
    }

    mediaQuery.addEventListener('change', setQuery)
    return function cleanup() {
      mediaQuery.removeEventListener('change', setQuery)
    }
  }, [userPrefersDark])

  // TODO: Implement a toggle in app
  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <DarkThemeContext.Provider
      value={{
        darkMode: isDark,
        toggleDarkMode: toggleTheme,
      }}
    >
      <Theme
        className={styles.Wrapper}
        data-dark-mode={isDark}
        theme={isDark ? 'g100' : 'g10'}
      >
        {children}
      </Theme>
    </DarkThemeContext.Provider>
  )
}
