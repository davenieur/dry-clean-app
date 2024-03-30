import { FormControl, FormLabel, Input, Grid, GridItem, Heading, VStack } from '@chakra-ui/react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const Filtrado = ({ fields, onInputChange, fecha_desde, setFecha_desde, fecha_hasta, setFecha_hasta }) => {
  
  
  return (
    <VStack w="100%">
      <Heading as="h3" fontSize="lg" color="brand.gray" alignSelf="flex-start"> Filtros </Heading>

      <Grid 
        templateColumns='repeat(4, 1fr)' 
        gap={6} 
        w="100%"
       
        padding="1rem"
      >
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
