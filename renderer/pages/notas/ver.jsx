import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { Heading, MenuItem, Text, VStack, Divider, Td, Tr, Button, ButtonGroup, HStack } from '@chakra-ui/react'
import { useForm, useDryCleanAPI } from '../../hooks'
import { ModifiableAlert, ModifiableCard, ModifiableForm, ModifiableMenu, ModifiableModal, ModifiableTable } from '../../components/modifiables'
import { MdBuild } from "react-icons/md"
import { FaTrash } from 'react-icons/fa'
import { AddIcon, ArrowDownIcon } from '@chakra-ui/icons'
import Swal from 'sweetalert2';

const prendaAddFormFields = {
  num_nota: '',
  cliente_name: '',
  fecha_recepcion: '',
  fecha_entrega: ''
}

export default function HomePage() {

  const { sucursales, selectedSucursal, selectSucursal, getListaNotas } = useDryCleanAPI()

  //   const {num_nota,cliente,id_sucursal,fecha_recepcion,fecha_entrega,prendas}=dataNota

  const { num_nota, cliente_name, fecha_recepcion, fecha_entrega, onInputChange: onAddNotaInputChange } = useForm( prendaAddFormFields );

  const [listaNotas, setListaNotas] = useState([])
  
  const fields = [
    {
      fieldName: "num_nota",
      type: "number",
      value: num_nota,
      label: "Número de nota",
      helper: "Ingresa el precio de la nota",
      error: "Nota requerida"
    },
    {
      fieldName: "cliente_name",
      type: "text",
      value: cliente_name,
      label: "Nombre del cliente",
      helper: "Ingresa el nombre del cliente",
      error: "Nombre del cliente requerido"
    },
    {
      fieldName: "fecha_recepcion",
      type: "date",
      value: fecha_recepcion,
      label: "Fecha de recepción",
      helper: "Ingresa la fecha de recepción",
      error: "Fecha de recepción requerida"
    },
  ]

  useEffect(() => {
    const fetchListaNotas = async () => {

      // {sucursal_id,num_nota,cliente_name,fecha_desde,fecha_hasta

      const dataPrenda = {
        sucursal_id: selectedSucursal.id,
        num_nota: '',
        cliente_name: '',
        fecha_desde: '',
        fecha_hasta: ''
      }
      const listaNotas = await getListaNotas(dataPrenda);
      setListaNotas(listaNotas);
       
    };
    fetchListaNotas();
}, []);

  const addNotaSubmit = () => {
    
    
    Swal.fire({
      title: "Nota agregada",
      text: `La nota ha sido agregada a la sucursal ${ selectedSucursal.nombre }`,
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
        <Heading as="h2" fontSize="2xl" color="brand.gray"> Ver notas </Heading>

        <ModifiableCard
          header={
            <HStack spacing="1rem">
              <Text>Agregar nota de la sucursal </Text>

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
            </HStack>
          }
          w="auto"
          bg="white"
          body={
            <>
              <ModifiableForm 
                w="100%"
                fields={ fields }
                onChange={ onAddNotaInputChange }
              />
            </>
          }
        >
        

         
        
        </ModifiableCard>

       
        
      </VStack>
    </>
  )
}
