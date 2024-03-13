import React from 'react'
import Head from 'next/head'

import { Heading, MenuItem, Text, VStack, Divider, HStack, useDisclosure  } from '@chakra-ui/react'
import { useForm, useDryCleanAPI } from '../../hooks'
import { ModifiableForm, ModifiableMenu, ModifiableModal, ModifiableTable } from '../../components/modifiables'

import { AddIcon, ArrowDownIcon } from '@chakra-ui/icons'
import Swal from 'sweetalert2';
import { ModifiableTableRow } from '../../components/modifiables/ModifiableTableRow'

const prendaAddFormFields = {
  nombre: '',
  precio: '',
  tipo_servicio: ''
}

export default function HomePage() {

  const { sucursales, selectedSucursal, deletePrenda, listaPrecios, addOrUpdatePrenda, selectSucursal } = useDryCleanAPI()

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
      options: ["Tintoreria", "Planchado", "Lavado", "Teñido", "Pintada 1 color"]
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
    
    addOrUpdatePrenda(dataPrenda)
    
    Swal.fire({
      title: "Prenda agregada",
      text: `La prenda ${ nombre } ha sido agregada a la sucursal ${ selectedSucursal.nombre }`,
      icon: "success"
    });
    
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
        gap="1rem"
      >
        <Heading as="h1"> RopaBella </Heading>
        <Heading as="h2" fontSize="xl" color="gray"> Lista de precios </Heading>

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
            onClick={ addPrendaSubmit }
          />

        </HStack>

        <VStack align="center" justify="center">
          {/* Tabla de los precios */}
          <ModifiableTable 
            p="1rem"
            w="auto"
            headers={[ "Id", "Nombre", "Servicio", "Precio", "Acciones"]}
            tbody={ 
              <>
                {
                  listaPrecios.map(( element, index ) => {
                    return(
                      
                      <ModifiableTableRow 
                        key={ index }
                        id={ element.id }
                        prendaNombre={ element.nombre }
                        prendaPrecio={ element.precio }
                        prendaServicio={ element.servicio }
                        deletePrenda={ deletePrenda }
                        selectedSucursal={ selectedSucursal }
                        addOrUpdatePrenda={ addOrUpdatePrenda }
                      />
                        
                    )
                  })
                }
              </>
            }
          />
        </VStack>
        
      </VStack>
    </>
  )
}
