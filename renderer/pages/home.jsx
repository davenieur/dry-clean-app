import React from 'react'
import Head from 'next/head'
import { Heading, VStack, Stack, Box, StackDivider, Text } from '@chakra-ui/react'
import { ModifiableCard } from '../components/modifiables'

export default function HomePage() {


  return (
    <VStack w="100%" align="flex-start" justify="flex-start">
      <Head>
        <title>Star Admin2</title>
      </Head>

      <VStack
        p="1rem"
        align="flex-start"
        justify="center"
        gap="1rem"
      >
        <Heading as="h1"> RopaBella </Heading>

      </VStack>
    </VStack>
  )
}
