import React from 'react'
import Head from 'next/head'

import { Heading, MenuItem, Text, VStack, Divider, Td, Tr  } from '@chakra-ui/react'
import useDryCleanAPI from '../../hooks/useDryCleanAPI'
import { ModifiableMenu, ModifiableTable } from '../../components/modifiables'

export default function HomePage() {

  const { sucursales, selectedSucursal, listaPrecios, selectSucursal } = useDryCleanAPI()


  return (
    <>
      <Head>
        <title>Star Admin2</title>
      </Head>
      <VStack
        p="1rem"
        align="flex-start"
        justify="flex-start"
        w="100%"
      >
        <Heading as="h1"> RopaBella </Heading>
        <Heading as="h2" fontSize="xl" color="gray"> Lista de precios </Heading>

        <ModifiableMenu 
          iconUrl='https://img.icons8.com/ios-filled/30/F3F3F3/down--v1.png'
          nombre={ selectedSucursal.nombre }
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
                      onClick={ () => selectSucursal(element) }
                    >
                        { element.nombre }
                    </MenuItem>
                  )
                })
              }
            </VStack>
          }
        />
        <ModifiableTable 
          w="100%"
          headers={[ "Id", "Nombre", "Servicio", "Precio"]}
          tbody={ 
            <>
              {
                listaPrecios.map(( element, index ) => {
                  const { id, nombre, servicio, precio } = element

                  return(
                      <Tr key={ index }>
                          <Td>{ id }</Td>
                          <Td>{ nombre }</Td>
                          <Td>{ servicio }</Td>
                          <Td>{ precio || '0' } </Td>
                      </Tr>
                      
                  )
                })
              }
            </>
          }
        />
        

      </VStack>
    </>
  )
}
