import React from 'react'
import Head from 'next/head'
import { Heading, VStack, Stack, Box, StackDivider, Text } from '@chakra-ui/react'
import { ModifiableCard } from '../../components/modifiables'
import useDryCleanAPI from '../../hooks/useDryCleanAPI'
export default function HomePage() {

  const { sucursales } = useDryCleanAPI();

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
        <Heading as="h2"></Heading> 

        <ModifiableCard 
          w="15rem"
          h="auto"
          bg="brand.white"
          header="Sucursales"
          body={
            <>
              <Stack divider={<StackDivider />} spacing='4'>
                {
                  sucursales.map(( sucursal, index ) => {
                    const { nombre, id } = sucursal 

                    return(
                      <Box key={`sucursal-${ nombre }-${ index }`}>
                        <Heading size='xs' textTransform='uppercase'>
                          { nombre }
                        </Heading>
                    </Box>
                    )
                  })
                }
              </Stack>
            </>
          }
        />
      </VStack>
    </VStack>
  )
}
