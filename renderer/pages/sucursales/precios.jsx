import React from 'react'
import Head from 'next/head'

import { Heading, MenuItem, Text, VStack, Divider, Td, Tr, Button, ButtonGroup  } from '@chakra-ui/react'
import useDryCleanAPI from '../../hooks/useDryCleanAPI'
import { ModifiableMenu, ModifiableTable } from '../../components/modifiables'
import { Spinner } from '@chakra-ui/react'
import { MdBuild , MdCall } from "react-icons/md"
import { FaTrash } from 'react-icons/fa'

export default function HomePage() {

  const { sucursales, selectedSucursal, listaPrecios,loadingPrices, selectSucursal, deletePrenda, updatePrenda } = useDryCleanAPI()

  console.log(selectedSucursal)

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
        
        {
          loadingPrices ? (
            <Spinner size='md' />
          ) : (
            <ModifiableTable 
              p="1rem"
              w="100%"
              headers={[ "Id", "Nombre", "Servicio", "Precio", "Acciones"]}
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
                            <Td>${ precio || '0' } </Td>
                            <Td> 
                              <ButtonGroup variant='outline' spacing='1'>
                                <Button leftIcon={<FaTrash />} colorScheme='red' fontSize="sm" onClick={() => deletePrenda( element )}>Eliminar</Button>
                                <Button leftIcon={<MdBuild />} colorScheme='blue' variant='solid' fontSize="sm" onClick={() => updatePrenda(selectedSucursal, element)}>
                                  Editar
                                </Button>
                              </ButtonGroup>
                            </Td>
                        </Tr>
                          
                      )
                    })
                  }
                </>
              }
            />
          )
        }

        
        

      </VStack>
    </>
  )
}
