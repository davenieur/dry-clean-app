// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../components/themes/theme'

import {RootLayout} from '../components'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
    </ChakraProvider>
  )
}

export default MyApp