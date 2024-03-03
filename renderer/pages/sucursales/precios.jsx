import React from 'react'
import Head from 'next/head'

import { Heading, MenuItem, Text, VStack, Divider  } from '@chakra-ui/react'
import useDryCleanAPI from '../../hooks/useDryCleanAPI'
import { ModifiableMenu } from '../../components/modifiables'

export default function HomePage() {

  const { sucursales, selectedSucursal, selectSucursal } = useDryCleanAPI()

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
        <Heading as="h2" fontSize="xl" color="gray"> Lista de precios </Heading>


        <VStack>
          <ModifiableMenu 
            iconUrl='https://img.icons8.com/ios-filled/30/F3F3F3/down--v1.png'
            nombre={ selectedSucursal }
            menuList={
              <VStack
                align="center"
                justify="flex-start"
              >
                <Text as="p" fontSize="sm" color="brand.primary" w="100%" p=".5rem">Seleccionar sucursal</Text>
                <Divider w="100%"/>
                {
                  sucursales.map(( element, index ) => {
                    return(
                      <MenuItem 
                        key={ index } 
                        fontSize="sm" 
                        color="brand.primary"
                        onClick={ () => selectSucursal(element.nombre) }
                      >
                          { element.nombre }
                      </MenuItem>
                    )
                  })
                }
              </VStack>
            }
          />
          {/* {
            sucursales.map(( sucursal, index ) => (
              <Text key={`sucursal-${ index }`}>{ sucursal.nombre }</Text>
            ))
          } */}
        </VStack>

      </VStack>
    </>
  )
}
