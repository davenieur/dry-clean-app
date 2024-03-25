import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { Heading, VStack, Grid, GridItem, Text, Card, Stack, CardBody, CardFooter, Button, HStack } from '@chakra-ui/react'
import { useForm, useDryCleanAPI } from '../../hooks'
import { ModifiableTable } from '../../components/modifiables'

import Swal from 'sweetalert2';

const prendaAddFormFields = {
  num_nota: '',
  cliente_name: '',
  fecha_recepcion: '',
  fecha_entrega: ''
}

export default function HomePage() {

  const { sucursales, selectedSucursal, selectSucursal, getListaNotas } = useDryCleanAPI()


  const { num_nota, cliente_name, fecha_recepcion, fecha_entrega, onInputChange: onAddNotaInputChange } = useForm( prendaAddFormFields );

  const [listaNotas, setListaNotas] = useState([])
  
  console.log(listaNotas)

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
    const fetchData = async () => {
      try {
        const dataPrenda = {
          sucursal_id: selectedSucursal.id,
          num_nota: '',
          cliente_name: '',
          fecha_desde: '',
          fecha_hasta: ''
        };
  
        const listaNotas = await getListaNotas(dataPrenda);
        setListaNotas(listaNotas);
      } catch (error) {
        console.error("Error al obtener la lista de notas:", error);
        // Aquí puedes manejar el error de la manera que prefieras, como mostrando un mensaje al usuario.
      }
    };
  
    fetchData();
  }, [selectedSucursal.id]); // Dependencia añadida para que useEffect se vuelva a ejecutar cuando selectedSucursal.id cambie
  

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

        <Grid templateColumns='repeat(3, 1fr)' gap={6} w="100%">
        {
          listaNotas.length > 0 ? (
            listaNotas.map((nota, index) => {
              const { num_nota, nombre_cliente, nombre_sucursal, fecha_entrega, fecha_recepcion, fecha_registro, precio_total } = nota

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
                  >
                    <Stack>
                        <CardBody>
                          <HStack spacing="2rem">
                            <Heading size='md'>{ nombre_cliente }</Heading>
                            <Heading size='md' color="brand.secondary">{ nombre_sucursal }</Heading>
                          </HStack>

                          <Text py='2' fontSize="md">
                            Fecha de entrega: { fecha_entrega }
                          </Text>

                          <Text py='2' fontSize="md">
                            Fecha de recepción: { fecha_recepcion }
                          </Text>

                          <Text py='2' fontSize="md">
                            Fecha de registro: { fecha_registro }
                          </Text>

                          <Text py='2' fontSize="md" fontWeight="bold">
                            {`Precio total: $${ precio_total ? precio_total : 0 }`}
                          </Text>

                          
                        </CardBody>

                        {/* <CardFooter>
                          <Button variant='solid' colorScheme='blue'>
                            Buy Latte
                          </Button>
                        </CardFooter> */}
                      </Stack>
                    
                  </Card>
                </GridItem>
              )
            }
            
            )
          ) : (
            <p>No hay notas disponibles.</p>
          )
        }
        </Grid>
      </VStack>
    </>
  )
}
