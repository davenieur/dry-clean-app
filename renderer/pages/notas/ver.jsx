import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { Heading, VStack, Grid, GridItem, Text, Card, CardBody, HStack } from '@chakra-ui/react'
import { useForm, useDryCleanAPI } from '../../hooks'
import { Filtrado } from '../../components/forms'

const notaFilterFormFields = {
  num_nota: '',
  cliente_name: '',
  fecha_recepcion: '',
  fecha_entrega: ''
}



export default function HomePage() {

  const { sucursales, selectedSucursal, selectSucursal, getListaNotas } = useDryCleanAPI()

  const { num_nota, cliente_name, fecha_recepcion, fecha_entrega, onInputChange } = useForm( notaFilterFormFields );

  
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
     
    },
    {
      fieldName: "fecha_recepcion",
      type: "text",
      value: fecha_recepcion,
      label: "Fecha de recepción",
     
    },
    {
      fieldName: "fecha_entrega",
      type: "text",
      value: fecha_entrega,
      label: "Fecha de entrega",
  
    },
  ]


  const [listaNotas, setListaNotas] = useState([])
  
 

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPrenda = {
          sucursal_id: selectedSucursal.id,
          num_nota: num_nota,
          cliente_name: cliente_name,
          fecha_desde: fecha_recepcion,
          fecha_hasta: fecha_entrega
        };
  
        const listaNotas = await getListaNotas(dataPrenda);
        setListaNotas(listaNotas);
      } catch (error) {
        console.error("Error al obtener la lista de notas:", error);
        // Aquí puedes manejar el error de la manera que prefieras, como mostrando un mensaje al usuario.
      }
    };
  
    fetchData();
  }, [selectedSucursal.id, num_nota, cliente_name, fecha_recepcion, fecha_entrega ]); // Dependencia añadida para que useEffect se vuelva a ejecutar cuando selectedSucursal.id cambie
  

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

        <Filtrado fields={ fields } onInputChange = { onInputChange } />

        <Heading as="h3" fontSize="lg" color="brand.gray"> Resultados </Heading>

        <Grid templateColumns='repeat(3, 1fr)' gap={6} w="100%">
          {
           
            listaNotas.map((nota, index) => {
              const { num_nota, nombre_cliente, nombre_sucursal, fecha_entrega, fecha_recepcion, fecha_registro, precio_total, prendas } = nota

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
                   
                  <HStack fontSize="sm" color="brand.gray" justify="space-between" w="100%"  key={index}>
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
                        
                        <Heading size='md' color="brand.secondary">{ nombre_sucursal }</Heading>
                        <Heading size='md'>{ nombre_cliente }</Heading>
                        <Text py='2' fontSize="sm" fontWeight="bold" opacity="0.75">
                          Número de nota: { num_nota ? num_nota : "S/N" }
                        </Text>
                      </VStack>
                      

                      

                      <VStack w="100%" align="flex-start"> 
                        <Text  fontSize="sm"  fontWeight="bold">
                            Fechas
                        </Text>

                        <Text fontSize="sm">
                          Fecha de entrega: { fecha_entrega }
                        </Text>

                        <Text  fontSize="sm">
                          Fecha de recepción: { fecha_recepcion }
                        </Text>

                        <Text fontSize="sm">
                          Fecha de registro: { fecha_registro }
                        </Text>
                      </VStack>

                      <VStack w="100%" align="flex-start">
                        <Heading as="h3" fontSize="sm">Prendas</Heading>
                      
                          { listaPrendas }

                      
                      </VStack>
                      
    
                      <Text fontSize="sm" w="100%" textAlign="end" align="center" fontWeight="bold">
                        {`Precio total: $${ precio_total ? precio_total : 0 }`}
                      </Text>
                      

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
