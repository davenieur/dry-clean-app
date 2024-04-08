import { Heading, VStack, GridItem, Text, Card, CardBody, HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import { ModifiableAlert, ModifiableCard } from '../modifiables';
import { FaTrash } from 'react-icons/fa';
import { convierteFecha } from "../../helpers";

export const Nota = ({ nota, onDeleteNota, isReporte = false }) => {
    const {
        num_nota,
        nombre_cliente,
        nombre_sucursal,
        fecha_entrega,
        fecha_recepcion,
        fecha_registro,
        precio_total,
        prendas
      } = nota;

      const newFecha_entrega = convierteFecha(fecha_entrega);
      const newFecha_registro = convierteFecha(fecha_registro);
      const newFecha_recepcion = convierteFecha(fecha_recepcion);

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
            <Text>${resumenPrendas[clave].totalPrecio}</Text>
          </HStack>
        );
      });

      return (
       
        <ModifiableCard 
            w = "100%"
            h = "auto"
            bg = "brand.white" 
            header = {
                <VStack w="100%" align="flex-start">
                    <Heading size='md' color="brand.secondary">{nombre_sucursal}</Heading> 
                    
                    <Text py='2' fontSize="sm" color="brand.tertiary" fontWeight="bold" opacity="0.75">
                        Número de nota: {num_nota ? num_nota : "S/N"}
                    </Text>
                </VStack>
            }
            body = {
                <VStack w="100" gap="1rem">
                    <VStack align="flex-start" w="100%">
                        <Heading size='md'>{nombre_cliente}</Heading>
                        <Text py='2' fontSize="sm" fontWeight="bold" opacity="0.75">
                            {isReporte ? newFecha_registro : `Fecha de registro: ${newFecha_registro}`}
                        </Text>
                    </VStack>

                    {
                        isReporte ? null : (
                            <VStack w="100%" align="flex-start">
                                <Heading as="h3" fontSize="sm">Fechas</Heading>
                                <Text fontSize="sm">Recepción: {newFecha_recepcion}</Text>
                                <Text fontSize="sm">Entrega: {newFecha_entrega}</Text>
                            </VStack>
                        )
                    }
                    
                    <VStack w="100%" align="flex-start">
                        <Accordion allowToggle w="100%">
                            <AccordionItem>
                                <AccordionButton>
                                    <Heading as="h3" fontSize="sm">Prendas</Heading>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel>
                                    {listaPrendas}
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </VStack>
                    <HStack w="100%">
                    {isReporte ? null : (
                        <ModifiableAlert
                            leftIcon={<FaTrash />}
                            fontSize="sm"
                            buttonText="Eliminar nota"
                            dialogBody={`¿Eliminar nota?`}
                            onClick={onDeleteNota}
                            param={num_nota}
                        />
                    )}

                        
                        <Text fontSize="sm" w="100%" textAlign="end" align="center" fontWeight="bold">
                            {`Precio total: $${precio_total ? precio_total : 0}`}
                        </Text>
                    </HStack>
                </VStack>
            }
        />
        
  
    )
}
