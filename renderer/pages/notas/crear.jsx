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

  const { sucursales, listaPrecios, selectedSucursal, addNota, selectSucursal } = useDryCleanAPI()
 
  // Fecha de recepcion
  const [fecha_recepcion, setFecha_recepcion ] = useState(new Date());

  // Fecha de entrega
  const [fecha_entrega,  setFecha_entrega] = useState(new Date())

  // Campos del formulario
  const { num_nota, cliente_name, onInputChange: onAddNotaInputChange } = useForm( prendaAddFormFields );

  // Lista de precios y servicios
  const [listaPreciosServicios, setlistaPreciosServicios] = useState([])

  // Botón inhabilitado
  const [disabledButton, setDisabledButton] = useState(true)

  // Definir si las prendas están bien
  const [prendasOk, setPrendasOk] = useState(false)

  // Arreglo de prendas
  const [prendas, setPrendas] = useState([
    {
      prenda_id: '',
      num_prendas: '',
      prenda_servicio: '',
      colores: [],
      precio: '',
      is_ok: false,
      is_comodin: ''
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

  // Validar si las prendas agregadas son validas
  useEffect(() => {
    const hasFalse = prendas.some(prenda => !prenda.is_ok); // Usar some en lugar de find para mejorar la legibilidad
    setPrendasOk(!hasFalse); // Setear el valor opuesto de hasFalse
    
  }, [prendas]);
  
  // Validar si el form cumple con las características
  useEffect(() => {
    const isFormComplete = fecha_entrega !== '' && fecha_recepcion !== '' && prendasOk && prendas.length !== 0;
    setDisabledButton(!isFormComplete); // Setear el botón deshabilitado al opuesto de isFormComplete
  
  }, [fecha_entrega, fecha_recepcion, num_nota, cliente_name, prendasOk]);
  
  // Cargar los precios y servicios
  useEffect(() => {
    const preciosServicios = listaPrecios
      .filter(prenda => prenda.precio) // Filtrar solo los elementos con precio definido
      .map(prenda => ({
        id: prenda.id,
        nombre: `${prenda.nombre} - ${prenda.servicio}`,
        value: `${prenda.nombre.toLowerCase().replace(/\s+/g, '-')}-${prenda.servicio.toLowerCase().replace(/\s+/g, '-')}`,
        precio: prenda.precio
      }));
  
    setlistaPreciosServicios(preciosServicios);
  
  }, [ listaPrecios ]);

  // Agregar un nuevo elemento de precio - servicio
  const handleAddCustomPrecioServicio = (prenda, servicio, precio) => {
    const prendaLower = prenda.toLowerCase().replace(/\s+/g, '-')
    const servicioLower = servicio.toLowerCase().replace(/\s+/g, '-')
    const nombre = prenda + ' - ' + servicio 
    const value = prendaLower + '-' + servicioLower
    const id = listaPreciosServicios.length + 1
    setlistaPreciosServicios([...listaPreciosServicios, { id: id, value, nombre: nombre, precio: precio }])
  }
  
  const addPrenda = () => {
    
    const newPrenda = {
      prenda_id:  '',
      num_prendas: '',
      prenda_servicio: '',
      colores: [],
      precio: '',
      isOk: false,
      isComodin: ''
    }
    setPrendas([...prendas, newPrenda ])
  }

  const deletePrenda = (prenda_index) => {
    const newPrendas = prendas.filter((_, index) => index !== prenda_index);
    setPrendas(newPrendas);
  }
  

  const updatePrenda = (prenda_index, prenda_id, num_prendas, prenda_servicio, colores, precio, is_comodin) => {
    console.log(prenda_index, prenda_id, num_prendas, prenda_servicio, colores, precio, is_comodin)

    // Crea una copia del arreglo de prendas
    const nuevasPrendas = [...prendas];

    let is_ok;

    if( num_prendas !== '' && prenda_servicio !== '' && colores.length !== 0 && precio !== '' && prenda_id !== ''){
      is_ok = true;
    } else{
      is_ok = false
    }

    // Actualiza el objeto con los nuevos valores
    nuevasPrendas[prenda_index] = {
      ...nuevasPrendas[prenda_index],
      prenda_id,
      num_prendas,
      prenda_servicio,
      colores,
      precio,
      is_ok,
      is_comodin
    };

    // Actualiza el estado prendas con el nuevo arreglo de prendas
      setPrendas(nuevasPrendas);
    
  }

  const addNotaSubmit = async() => {

    
    const dataNota = {
      cliente: cliente_name,
      num_nota: num_nota,
      id_sucursal: selectedSucursal.id,
      fecha_entrega: fecha_entrega,
      fecha_recepcion: fecha_recepcion,
      prendas: prendas
    }

    try {
      // Intenta actualizar la prenda
      await addNota(dataNota);
  
      // Si se agregar correctamente, muestra un mensaje de éxito
      Swal.fire({
        title: "Nota agregada",
        text: `La nota ha sido agregada a la sucursal ${ selectedSucursal.nombre }`,
        icon: "success"
      });

    } catch (error) {
      // Si hay un error al eliminar la prenda, muestra un mensaje de error
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al intentar crear la prenda.",
        icon: "error"
      });
    }
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
                                
                                <DatePicker showIcon selected={ fecha_recepcion } onChange={(date) => setFecha_recepcion(date)} dateFormat="dd/MM/yyyy"/>

                        </FormControl>
                        {/* Fecha de entrega */}
                        <FormControl isInvalid={ fecha_entrega < fecha_recepcion } isRequired>
                                <FormLabel>Fecha de entrega</FormLabel>
                                
                                <DatePicker showIcon selected={ fecha_entrega } onChange={(date) => setFecha_entrega(date)} dateFormat="dd/MM/yyyy"/>
                                
                                {fecha_entrega > fecha_recepcion ? (
                                    null
                                    ) : (
                                    <FormErrorMessage>La fecha de entrega no puede ser antes de la fecha de recepción</FormErrorMessage>
                                )}

                        </FormControl>
                    </HStack>   
                    
                    {/* Prendas */}
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
                                prendas.map((prenda, index) => {
                                  
                                  return( 
                                    <AddNotaTableRow 
                                      key={`lista-prendas-item-${ index }`}
                                      prendaIndex={ index }
                                      deletePrenda={ deletePrenda }
                                      listaPreciosServicios={ listaPreciosServicios }
                                      updatePrenda = { updatePrenda }
                                      handleAddCustomPrecioServicio = { handleAddCustomPrecioServicio }
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
