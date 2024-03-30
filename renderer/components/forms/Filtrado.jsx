import { FormControl, FormLabel, Input, Grid, GridItem, Heading, VStack, Divider, Text, MenuItem } from '@chakra-ui/react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ModifiableMenu  } from '../../components/modifiables'
import { ArrowDownIcon } from '@chakra-ui/icons';

export const Filtrado = ({ selectSucursal, selectedSucursal, sucursales, fields, onInputChange, fecha_desde, setFecha_desde, fecha_hasta, setFecha_hasta }) => {
  
  
  return (
    <VStack w="100%">
      <Heading as="h3" fontSize="lg" color="brand.gray" alignSelf="flex-start"> Filtros </Heading>

      <Grid 
        templateColumns='repeat(5, 1fr)' 
        gap={6} 
        w="100%"
        templateRows="1fr"
        padding="1rem"
      >
        <GridItem 
          w='100%' 
          h='auto' 
          color="brand.gray"
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          flexDir="column"
          gap=".5rem"
        >
          <Text>Sucursal </Text>
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
        </GridItem>

        {
          fields.map(( field, index) => {
            const { value, fieldName, label, error, helper } = field

          

            return(
              <GridItem key={`form-filter-${ index }`} 
                w='100%' 
                h='auto' 
                color="brand.gray"
              >
                
                <FormControl onChange={ onInputChange } isRequired={ false } >
                  <FormLabel>{ label }</FormLabel>
                
                    <Input type="text" value={ value } name={ fieldName }  onChange={ onInputChange }/>
                  

                </FormControl>
              </GridItem>
            )
          })
        }

        <GridItem>
          <FormControl>
            <FormLabel>Fecha de registro desde</FormLabel>
            
            <DatePicker showIcon selected={ fecha_desde } onChange={(date) => setFecha_desde(date)} dateFormat="dd/MM/yyyy"/>

          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Fecha de registro hasta</FormLabel>
            
            <DatePicker showIcon selected={ fecha_hasta } onChange={(date) => setFecha_hasta(date)} dateFormat="dd/MM/yyyy"/>

          </FormControl>
        </GridItem>

      </Grid>

    </VStack>
  )
}
