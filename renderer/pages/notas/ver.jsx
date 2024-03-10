import React from 'react'
import Head from 'next/head'

import { Heading, MenuItem, Text, VStack, Divider, Td, Tr, Button, ButtonGroup, HStack } from '@chakra-ui/react'
import { useForm, useDryCleanAPI } from '../../hooks'
import { ModifiableAlert, ModifiableForm, ModifiableMenu, ModifiableModal, ModifiableTable } from '../../components/modifiables'
import { MdBuild } from "react-icons/md"
import { FaTrash } from 'react-icons/fa'
import { AddIcon, ArrowDownIcon } from '@chakra-ui/icons'
import Swal from 'sweetalert2';

const prendaAddFormFields = {
  nombre: '',
  precio: '',
  tipo_servicio: ''
}

export default function HomePage() {

  const { sucursales, selectedSucursal, selectSucursal } = useDryCleanAPI()

  const { nombre, precio, tipo_servicio, onInputChange: onAddPrendaInputChange } = useForm( prendaAddFormFields );
  
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

  const addNotaSubmit = () => {
    
    
    Swal.fire({
      title: "Nota agregada",
      text: `La nota ha sido agregada a la sucursal ${ selectedSucursal.nombre }`,
      icon: "success"
    });
    
  }

//   const onDeletePrenda = (element) => {
//     deletePrenda( element )
//   }

//   const onUpdatePrenda = (id) => {
//     const id_sucursal = selectedSucursal.id;

//     const dataPrenda = {
//       id_prenda: id,
//       nombre: nombre,
//       precio: precio,
//       tipo_servicio: tipo_servicio,
//       id_sucursal: id_sucursal
//     }

//     updatePrenda(dataPrenda, id_sucursal)

//     Swal.fire({
//       title: "Prenda actualizada",
//       text: `La prenda ${ nombre } ha sido actualizada`,
//       icon: "success"
//     });
//   }


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
        gap="1rem"
      >
        <Heading as="h1"> RopaBella </Heading>
        <Heading as="h2" fontSize="xl" color="gray"> Ver notas </Heading>

        <HStack
          w="100%"
        >
          {/* Selección de sucursal */}
          <ModifiableMenu 
            icon={ <ArrowDownIcon color="brand.white"/>}
            nombre={ selectedSucursal.nombre }
            bg="brand.secondary"
            color="brand.white"
            hoverBg="brand.secondary"
            expandedBg="brand.tertiary"
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
          <ModifiableModal 
            leftIcon={<AddIcon />}
            colorScheme='green'
            fontSize="sm"
            modalHeader="Agregar prenda"
            buttonText={"Agregar prenda"}
            modalBody={    
              <ModifiableForm 
                fields={ fields }
                onChange={ onAddPrendaInputChange }
              />
            }
            onClick={ addNotaSubmit }
          />

        </HStack>

       
        
      </VStack>
    </>
  )
}
