import { createContext, useContext } from 'react'

export const DarkThemeContext = createContext<{
  darkMode: boolean
  toggleDarkMode: VoidFunction
}>({
  darkMode: false,
  toggleDarkMode: () => {},
})

export const useDarkTheme = () => {
  return useContext(DarkThemeContext)
}
