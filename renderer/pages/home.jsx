import React from 'react'
import Head from 'next/head'
import { Heading, VStack, HStack, Box, StackDivider, Text, Grid, GridItem, Image, ButtonGroup, Button, Link } from '@chakra-ui/react'
import { ModifiableCard } from '../components/modifiables'

export default function HomePage() {

  const accesosRadidos = [
    { 
      nombre: "Sucursales",
      iconUrl: "https://img.icons8.com/ios-filled/50/BF0B1A/shop.png",
      paths: [
        {
          nombre: "Lista de precios",
          path: '/sucursales/precios'
        }
      ]
    },
    { 
      nombre: "Notas",
      iconUrl: "https://img.icons8.com/ios-filled/50/BF0B1A/sticky-notes.png",
      paths: [
        {
          nombre: "Ver notas",
          path: '/notas/ver'
        },
        {
          nombre: "Crear nueva nota",
          path: '/notas/crear'
        }
      ]
    }
    
  ]

  return (
    <VStack w="100%" align="flex-start" justify="flex-start">
      <Head>
        <title>Star Admin2</title>
      </Head>

      <VStack
        p="1rem"
        align="flex-start"
        justify="center"
        gap="2rem"
      >
        <Heading as="h1" fontSize="4xl"> RopaBella </Heading>
        
        <Heading as="h2" fontSize="2xl" color="brand.gray"> Accesos rápidos </Heading>
        <Grid gap="1rem" w= "100%">
          {
            accesosRadidos.map(( accesoRapido, index ) => {
              const { nombre, iconUrl, paths } = accesoRapido

              return(
                <GridItem key={`${ nombre }-${ index }-accesos-rapidos`}>
                  <ModifiableCard 
                    w="20rem"
                    header={ 
                      <HStack>
                        <Image
                            src= { iconUrl }
                            alt={ `${ nombre }-logo`}
                            width="3rem"
                            height="auto"
                        />
                        <Text fontSize="lg"> { nombre }</Text>
                      </HStack>
                    }
                    body={
                      <ButtonGroup>
                        {
                          paths.map(( path, index) => {
                            const { nombre, path: url } = path

                            return(
                              <Link href={ url } key={`${ nombre }-${ path }-url`}>
                                <Button>
                                  <Text>{ nombre }</Text>
                                </Button>
                              </Link>
                              
                            )
                          })
                        }

                      </ButtonGroup>
                    }
                  />
                </GridItem>
              )
            })
          }
        </Grid>
      </VStack>
    </VStack>
  )
}
