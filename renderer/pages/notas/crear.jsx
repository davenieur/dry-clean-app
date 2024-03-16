import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { Heading, MenuItem, Text, VStack, Divider, HStack, FormControl, FormLabel, FormErrorMessage, Td, Button, Tr } from '@chakra-ui/react'
import { useForm, useDryCleanAPI } from '../../hooks'
import { ModifiableCard, ModifiableForm, ModifiableMenu, ModifiableTable } from '../../components/modifiables'

import { AddIcon, ArrowDownIcon } from '@chakra-ui/icons'
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdCreate } from 'react-icons/md'
import { AddNotaTableRow } from '../../components/forms'

const prendaAddFormFields = {
  num_nota: '',
  cliente_name: '',
  fecha_recepcion: '',
  fecha_entrega: ''
}


export default function HomePage() {

  const { sucursales, listaPrecios, selectedSucursal, selectSucursal } = useDryCleanAPI()
 
  const [fecha_recepcion, setFecha_recepcion ] = useState(new Date());

  const [fecha_entrega,  setFecha_entrega] = useState(new Date())

  const { num_nota, cliente_name, onInputChange: onAddNotaInputChange } = useForm( prendaAddFormFields );

  const [listaNotas, setListaNotas] = useState([])

  const [disabledButton, setDisabledButton] = useState(true)

  const [prendasOk, setPrendasOk] = useState(false)

  const [prendas, setPrendas] = useState([
    {
      prenda_id: 1,
      num_prendas: '',
      prenda_servicio: '',
      color: '',
      precio: '',
      precio_total: '',
      is_ok: false
    }
  ])

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
  ]
  useEffect(() => {
    const hasFalse = prendas.some(prenda => !prenda.is_ok); // Usar some en lugar de find para mejorar la legibilidad
    setPrendasOk(!hasFalse); // Setear el valor opuesto de hasFalse
  
  }, [prendas]);
  
  useEffect(() => {
    const isFormComplete = fecha_entrega !== '' && fecha_recepcion !== '' && num_nota !== '' && cliente_name !== '' && prendasOk;
    setDisabledButton(!isFormComplete); // Setear el botón deshabilitado al opuesto de isFormComplete
  
  }, [fecha_entrega, fecha_recepcion, num_nota, cliente_name, prendasOk]);
  
  useEffect(() => {
    const preciosServicios = listaPrecios
      .filter(prenda => prenda.precio) // Filtrar solo los elementos con precio definido
      .map(prenda => ({
        nombre: `${prenda.nombre} - ${prenda.servicio}`,
        value: `${prenda.nombre.toLowerCase().replace(/\s+/g, '-')}-${prenda.servicio.toLowerCase().replace(/\s+/g, '-')}`,
        precio: prenda.precio
      }));
  
    setListaNotas(preciosServicios);
  
  }, [listaPrecios]);
  

  const addPrenda = () => {
    const newPrenda = {
      prenda_id:  prendas.length + 1,
      num_prendas: '',
      prenda_servicio: '',
      color: '',
      precio: '',
      precio_total: ''
    }
    setPrendas([...prendas, newPrenda ])
  }

  const deletePrenda = (prenda_id) => {
    const newPrendas = prendas.filter( prenda => prenda.prenda_id !== prenda_id )
    setPrendas(newPrendas)
  }

  const updatePrenda = (prenda_id, num_prendas, prenda_servicio, color, precio, precio_total) => {
    // Encuentra el índice del objeto en el arreglo 'prendas' que tenga el prenda_id dado
    const index = prendas.findIndex(prenda => prenda.prenda_id === prenda_id);
    
    // Verifica si se encontró el objeto en el arreglo
    
    // Crea una copia del arreglo de prendas
    const nuevasPrendas = [...prendas];

    let is_ok;

    if( num_prendas !== '' && prenda_servicio !== '' && color !== ''){
      is_ok = true;
    } else{
      is_ok = false
    }

    // Actualiza el objeto con los nuevos valores
    nuevasPrendas[index] = {
      ...nuevasPrendas[index],
      num_prendas,
      prenda_servicio,
      color,
      precio,
      precio_total,
      is_ok
    };

    // Actualiza el estado prendas con el nuevo arreglo de prendas
      setPrendas(nuevasPrendas);
    
  }

  const addNotaSubmit = () => {

    const cliente = {
      nombre: cliente_name,
      sucursal_id: selectedSucursal.id,
      is_owner_sucursal: false
    }

    const dataNota = {
      cliente: cliente,
      num_nota: num_nota,
      id_sucursal: selectedSucursal.id,
      fecha_entrega: fecha_entrega,
      fecha_recepcion: fecha_recepcion,
      prendas: prendas
    }

    console.log(dataNota)

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
        <Heading as="h2" fontSize="2xl" color="brand.gray"> Crear nota </Heading>

        
        <ModifiableCard
            w="100%"
            bg="white"
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
            body={
                <VStack w="100%" spacing="2rem">
                    <ModifiableForm 
                        w="100%"
                        fields={ fields }
                        onChange={ onAddNotaInputChange }
                    />

                    <HStack w="100%" justify="space-between">
                        {/* Fecha de recepción */}
                        <FormControl isInvalid={ fecha_recepcion === '' } isRequired>
                                <FormLabel>Fecha de recepción</FormLabel>
                                
                                <DatePicker showIcon selected={ fecha_recepcion } onChange={(date) => setFecha_recepcion(date)}/>

                        </FormControl>
                        {/* Fecha de entrega */}
                        <FormControl isInvalid={ fecha_entrega < fecha_recepcion } isRequired>
                                <FormLabel>Fecha de entrega</FormLabel>
                                
                                <DatePicker showIcon selected={ fecha_entrega } onChange={(date) => setFecha_entrega(date)}/>
                                
                                {fecha_entrega > fecha_recepcion ? (
                                    null
                                    ) : (
                                    <FormErrorMessage>La fecha de entrega no puede ser antes de la fecha de recepción</FormErrorMessage>
                                )}

                        </FormControl>
                    </HStack>   
                    
                   
                    <FormControl isInvalid={ prendas.length === 0 } isRequired>
                        <FormLabel>Prendas</FormLabel>
                        {/* Tabla de los precios */}
                        <ModifiableTable 
                            p="1rem"
                            w="auto"
                            headers={[ "Num prendas", "Prenda - Servicio", "Colores", "Precio c/u", "Precio total", "Acciones"]}
                            tbody= {     
                              <>
                                {
                                  prendas.map(prenda => {
                                    const { prenda_id } = prenda
                                    return( 
                                      <AddNotaTableRow 
                                        prenda_id={ prenda_id }
                                        deletePrenda={ deletePrenda }
                                        listaNotas={ listaNotas }
                                        updatePrenda = { updatePrenda }
                                      /> 
                                    )
                                  })
                                }
                              </>          
                              
                            }
                        />
                    </FormControl>
                    <Button  w="fit-content" colorScheme='blue' fontSize="md" leftIcon={ <AddIcon /> } onClick={ addPrenda }>
                      Agregar prenda
                    </Button>

                    <Button  w="100%" colorScheme='green' fontSize="md" leftIcon={ <MdCreate /> } onClick={() => addNotaSubmit() } isDisabled={ disabledButton }>
                        Crear nota
                    </Button>
                </VStack>
            }
        >
        

         
        
        </ModifiableCard>

       
        
      </VStack>
    </>
  )
}