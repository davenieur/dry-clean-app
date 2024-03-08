import React from 'react'
import Head from 'next/head'

import { Heading, MenuItem, Text, VStack, Divider, Td, Tr, Button, ButtonGroup, HStack, useDisclosure  } from '@chakra-ui/react'
import { useForm, useDryCleanAPI } from '../../hooks'
import { ModifiableForm, ModifiableMenu, ModifiableModal, ModifiableTable } from '../../components/modifiables'
import { Spinner } from '@chakra-ui/react'
import { MdBuild , MdCall } from "react-icons/md"
import { FaTrash } from 'react-icons/fa'
import { AddIcon } from '@chakra-ui/icons'

const prendaFormFields = {
  nombre: '',
  precio: '',
  tipo_servicio: ''
}

export default function HomePage() {

  const { sucursales, selectedSucursal, listaPrecios, addPrenda, selectSucursal, deletePrenda, updatePrenda } = useDryCleanAPI()

  const { isOpen, onOpen, onClose} = useDisclosure();

  const { nombre, precio, tipo_servicio, onInputChange: onAddPrendaInputChange } = useForm( prendaFormFields );

  const fields = [
    {
      fieldName: "nombre",
      type: "text",
      value: nombre,
      label: "Nombre",
      helper: "Ingresa el nombre de la prenda",
      error: "Nombre de la prenda requerido"
    },
    {
      fieldName: "precio",
      type: "number",
      value: precio,
      label: "Precio",
      helper: "Ingresa el precio de la prenda",
      error: "Precio requerido"
    },
    {
      fieldName: "tipo_servicio",
      type: "menu",
      value: tipo_servicio,
      label: "Tipo de servicio",
      helper: "Selecciona el tipo de servicio",
      error: "Tipo de servicio requerido",
      options: ["Tintorería", "Planchado", "Lavado", "Teñido", "Pintada 1 color"]
    }
  ]

  const addPrendaSubmit = () => {
    const id_sucursal = selectedSucursal.id;
    const dataPrenda = {
      nombre: nombre,
      precio: precio,
      tipo_servicio: tipo_servicio,
      id_sucursal: id_sucursal
    }

    addPrenda(dataPrenda)
    
  }


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

        <HStack
          w="100%"
        >
          {/* Selección de sucursal */}
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
          
          {/* Agregar prenda */}
          <Button leftIcon={<AddIcon />} colorScheme='green' fontSize="sm" onClick={ onOpen }>Agregar prenda</Button>

          <ModifiableModal 
            isOpen={ isOpen }
            onClose={ onClose }
            modalHeader="Agregar prenda"
            modalBody={    
              <ModifiableForm 
                fields={ fields }
                onChange={ onAddPrendaInputChange }
              />
            }
            onClick={ addPrendaSubmit }
          />

        </HStack>

        

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

      </VStack>
    </>
  )
}
