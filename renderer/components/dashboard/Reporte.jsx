import { useEffect, useState } from "react"
import { Nota } from "./Nota"
import { VStack, Text, Accordion, AccordionItem, AccordionPanel, AccordionButton, Heading, AccordionIcon } from "@chakra-ui/react"

export const Reporte = ({ fecha_desde, fecha_hasta, notas, onDeleteNota }) => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const prendas = notas.map( nota => nota.prendas )

    let sumTotal = 0
    
    prendas.forEach(array => {
      const suma = array.reduce((acumulador, producto) => acumulador + producto.precio, 0);
      sumTotal+=suma
    })

    setTotal(sumTotal)

  }, [])
  
  return (
    <VStack w="100%" align="flex-start">
      <Text fontSize="md" fontWeight="bold">REPORTE</Text>
      <Text fontSize="md">Desde: { fecha_desde } a: { fecha_hasta }</Text>
      <Text fontSize="md">Notas: </Text>
      
    
      <Accordion allowToggle w="100%">
        {
          notas.map((nota, index) => {
              return(
                <AccordionItem>
                  <AccordionButton>
                    <Heading as="h3" fontSize="sm">Nota: { nota.num_nota }</Heading>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <Nota 
                      nota={ nota }
                      key={index} 
                      onDeleteNota={ onDeleteNota }
                      isReporte = { true }
                     />
                  </AccordionPanel>
                </AccordionItem>
               
              )
          })
          
        }

      </Accordion>
      
      <Text fontSize="md">Total recaudado: ${ total }</Text>
 
    </VStack>
  )
}
