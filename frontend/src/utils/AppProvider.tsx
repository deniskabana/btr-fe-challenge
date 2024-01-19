import { ApolloProvider } from '@apollo/client'
import { apollo } from '@/api/apollo'
import { ThemeProvider } from '@/utils/ThemeProvider/ThemeProvider'
import { Toaster } from 'react-hot-toast'

/**
 * AppProvider
 * - a component intended to house ALL providers
 * - only add providers to this component to keep _app.tsx clean
 */

export const AppProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <ApolloProvider client={apollo}>
        <ThemeProvider>
          <Toaster />
          {children}
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}
