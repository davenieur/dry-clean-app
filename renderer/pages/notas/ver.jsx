import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { ModifiableAlert } from '../../components/modifiables'
import { FaTrash } from 'react-icons/fa'
import { Heading, VStack, Grid, GridItem, Text, Card, CardBody, HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel } from '@chakra-ui/react'
import { useForm, useDryCleanAPI } from '../../hooks'
import { Filtrado } from '../../components/forms'
import { convierteFecha, obtenerLunesYViernesDeSemana } from '../../helpers'

import Swal from 'sweetalert2';

const notaFilterFormFields = {
  num_nota: '',
  cliente_name: '',
  fecha_recepcion: '',
  fecha_entrega: ''
}



export default function HomePage() {

  const { sucursales, selectedSucursal, selectSucursal, getListaNotas, deleteNota } = useDryCleanAPI()

  const { num_nota, cliente_name, onInputChange } = useForm( notaFilterFormFields );


   // Fecha desde
   const [fecha_desde, setFecha_desde ] = useState(null);

   // Fecha hasta
   const [fecha_hasta,  setFecha_hasta] = useState(null)

  useEffect(() => {
    const { lunes, viernes } = obtenerLunesYViernesDeSemana (new Date())

    setFecha_desde(lunes)

    setFecha_hasta(viernes)
  }, [])


  const fields = [
    {
      fieldName: "num_nota",
      type: "number",
      value: num_nota,
      label: "Número de nota",
     
    },
    {
      fieldName: "cliente_name",
      type: "text",
      value: cliente_name,
      label: "Nombre del cliente",
     
    }
  ]

   // Eliminar nota
   const onDeleteNota = async (nota_id) => {

    const dataNota = {
      nota_id: nota_id,
    }
  
    try {
      // Intenta eliminar la nota
      await deleteNota(dataNota);
  
      // Si se elimina correctamente, muestra un mensaje de éxito
      Swal.fire({
        title: "Nota eliminada",
        text: `La nota ha sido eliminada correctamente.`,
        icon: "success"
      });
    } catch (error) {
      // Si hay un error al eliminar la nota, muestra un mensaje de error
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al intentar eliminar la nota.",
        icon: "error"
      });
    }
  };
  


  const [listaNotas, setListaNotas] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPrenda = {
          sucursal_id: selectedSucursal.id,
          num_nota: num_nota,
          cliente_name: cliente_name,
          fecha_desde: convierteFecha(fecha_desde),
          fecha_hasta: convierteFecha(fecha_hasta)
        };
  
        const listaNotas = await getListaNotas(dataPrenda);
        setListaNotas(listaNotas);
      } catch (error) {
        console.error("Error al obtener la lista de notas:", error);
        // Aquí puedes manejar el error de la manera que prefieras, como mostrando un mensaje al usuario.
      }
    };
  
    fetchData();
  }, [selectedSucursal.id, num_nota, cliente_name, fecha_desde, fecha_hasta ]); 
  

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

        <Filtrado 
          fields={ fields } 
          onInputChange = { onInputChange } 
          fecha_desde={ fecha_desde }
          fecha_hasta={ fecha_hasta }
          setFecha_desde={ setFecha_desde }
          setFecha_hasta={ setFecha_hasta }
          selectSucursal={ selectSucursal }
          selectedSucursal={ selectedSucursal }
          sucursales={ sucursales }
        />
        
        <Heading as="h3" fontSize="lg" color="brand.gray"> Resultados </Heading>

        <Grid templateColumns='repeat(3, 1fr)' gap={6} w="100%">
          {
           
            listaNotas.map((nota, index) => {
              const { num_nota, nombre_cliente, nombre_sucursal, fecha_entrega, fecha_recepcion, fecha_registro, precio_total, prendas } = nota

              const newFecha_entrega = convierteFecha(fecha_entrega)

              const newFecha_registro = convierteFecha(fecha_registro)

              const newFecha_recepcion = convierteFecha(fecha_recepcion)

              // Usar reduce para agrupar las prendas por color y nombre de prenda, y sumar sus precios
              let resumenPrendas = prendas.reduce((resumen, prenda) => {
                // Crear una clave única para cada combinación de color y nombre de prenda
                let clave = `${prenda.nombre_prenda}-${prenda.color}`;

                // Si la clave ya existe en el objeto de resumen, sumar el precio
                if (resumen[clave]) {
                    resumen[clave].totalPrecio += prenda.precio;
                    resumen[clave].cantidadPrendas++;
                } else {
                    // Si la clave no existe, inicializar el precio
                    resumen[clave] = {
                        totalPrecio: prenda.precio,
                        cantidadPrendas: 1
                    };
                }

                return resumen;
              }, {});

              
              // Mapear el objeto de conteo para renderizar cada combinación de nombre y color
              const listaPrendas = Object.keys(resumenPrendas).map((clave, index) => {
                let [nombre, color] = clave.split("-");
                return (
                   
                  <HStack fontSize="sm" color="brand.gray" justify="space-between" w="100%" key={index}>
                    <Text>{`${nombre} - ${color}: ${resumenPrendas[clave].cantidadPrendas} ${resumenPrendas[clave].cantidadPrendas === 1 ? "prenda" : "prendas"}`}</Text>
                    <Text> ${resumenPrendas[clave].totalPrecio} </Text>
                  </HStack>
                  
                );
              });
            

              return (
                <GridItem key={index} 
                  w='100%' 
                  h='auto' 
                  color="brand.white"
                  bg="brand.blue"
                  
                >
                  <Card
                    variant="outline"
                    padding="1rem"
                    w="100%"
                  >
                  
                    <CardBody display="flex" flexDir="column" gap="2rem"  w="100%">
                      <VStack align="flex-start" w="100%">
                        <HStack  w="100%" justify="space-between">
                          <Heading size='md' color="brand.secondary">{ nombre_sucursal }</Heading>
                          <Text py='2' fontSize="sm" color="brand.tertiary" fontWeight="bold" opacity="0.75">
                            Número de nota: { num_nota ? num_nota : "S/N" }
                          </Text>
                        </HStack>

                        <Heading size='md'>{ nombre_cliente }</Heading>
                       
                        <Text py='2' fontSize="sm" fontWeight="bold" opacity="0.75">
                          Fecha de registro: { newFecha_registro }
                        </Text>
                        
                      </VStack>
                      
                      <VStack w="100%" align="flex-start"> 
                        <Heading as="h3" fontSize="sm">Fechas</Heading>
                        <Text  fontSize="sm">
                          Recepción: { newFecha_recepcion }
                        </Text>
                        <Text fontSize="sm">
                          Entrega: { newFecha_entrega }
                        </Text>
                      </VStack>

                      <VStack w="100%" align="flex-start">
                        
                        <Accordion allowToggle>
                          <AccordionItem>
                           
                          <AccordionButton>
                            <Heading as="h3" fontSize="sm">Prendas</Heading>
                            <AccordionIcon />
                          </AccordionButton>
                           
                          <AccordionPanel >
                            { listaPrendas }
                          </AccordionPanel>
                        </AccordionItem>

                          
                        </Accordion>

                     
                      </VStack>
                      
                      <HStack w="100%">
                        {/* Eliminar nota */}
                        <ModifiableAlert 
                          leftIcon={<FaTrash />}
                          fontSize="sm"
                          buttonText="Eliminar nota"
                          dialogBody={`¿Eliminar nota?`} 
                          onClick={ onDeleteNota } 
                          param = { num_nota }
                        />

                        <Text fontSize="sm" w="100%" textAlign="end" align="center" fontWeight="bold">
                          {`Precio total: $${ precio_total ? precio_total : 0 }`}
                        </Text>
                      </HStack>
                    
                    </CardBody>
                  </Card>
                </GridItem>
              )
            }
          
          )
          
        }
        </Grid>
      </VStack>
    </>
  )
}
