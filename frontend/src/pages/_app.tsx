import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import '@/styles/global.scss'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

// Since @carbon is a client-side package, this disables SSR for the entire app
// instead of having to use not yet standardized 'use client' directive everywhere.
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
