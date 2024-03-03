import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Heading } from '@chakra-ui/react'
import { Box,Text, VStack } from '@chakra-ui/react'
import useDryCleanAPI from '../hooks/useDryCleanAPI'

export default function HomePage() {

  const { sucursales } = useDryCleanAPI()

  
  
  
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
