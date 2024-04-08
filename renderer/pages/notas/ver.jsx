import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { ModifiableModal } from '../../components/modifiables'
import { Heading, VStack, Grid, Text, HStack} from '@chakra-ui/react'
import { useForm, useDryCleanAPI } from '../../hooks'
import { Filtrado } from '../../components/forms'
import { convierteFecha, obtenerLunesYDomingoDeSemana } from '../../helpers'

import Swal from 'sweetalert2';
import { ViewIcon } from '@chakra-ui/icons'
import { Nota, Reporte } from '../../components'

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
    const { lunes, domingo } = obtenerLunesYDomingoDeSemana (new Date())

    setFecha_desde(lunes)

    setFecha_hasta(domingo)
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
        
        <HStack w="100%" spacing="2rem">
          <Heading as="h3" fontSize="lg" color="brand.gray"> Resultados: { listaNotas.length } </Heading>
          
          {/* Generar reporte */}
          {
            listaNotas.length !== 0 ? (
              <ModifiableModal
                leftIcon={<ViewIcon />}
                colorScheme='blue'
                fontSize="sm"
                modalHeader="Generar reporte"
                buttonText={"Generar reporte"}
                modalBody={    
                  <Reporte 
                    fecha_desde={ convierteFecha(fecha_desde) }
                    fecha_hasta={ convierteFecha(fecha_hasta) }
                    notas={ listaNotas }
                    onDeleteNota={ onDeleteNota }
                  />
                }
                onClick={ () => console.log("uwu") }
              />
            ) : null
          }
        </HStack>


        {
          listaNotas.length !== 0 ? (
           
            <Grid templateColumns='repeat(3, 1fr)' gap={6} w="100%">
              {
                listaNotas.map((nota, index) => {
                    return(
                      <Nota 
                        nota={ nota }
                        key={index} 
                        onDeleteNota={ onDeleteNota }
                      />
                    )
                })
                
              }
            </Grid>
            
          ) : (<Text fontSize="md" w="100%">No hay ningún resultado</Text>)
        }


      </VStack>
    </>
  )
}
