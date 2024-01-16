import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import '@/styles/global.scss'
import { AppProvider } from '@/utils/AppProvider'

function App({ Component, pageProps }: AppProps) {
  // DO NOT ADD PROVIDERS TO _APP
  return (
    <>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}

// Since @carbon is a client-side package, this disables SSR for the entire app
// instead of having to use not yet standardized 'use client' directive everywhere.
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
