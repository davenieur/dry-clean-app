import React from 'react'
import Head from 'next/head'
import { Heading, VStack } from '@chakra-ui/react'

export default function HomePage() {

  return (
    <>
      <Head>
        <title>Star Admin2</title>
      </Head>
      <VStack
        p="1rem"
        align="flex-start"
        justify="center"
      >
        <Heading as="h1"> RopaBella </Heading>

        
      </VStack>
    </>
  )
}
