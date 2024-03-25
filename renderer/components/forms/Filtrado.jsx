import { useDryCleanAPI, useForm } from '../../hooks';
import { Box, FormControl, FormLabel, Input, Grid, GridItem, Heading, VStack } from '@chakra-ui/react'
import { ModifiableForm } from '../modifiables';


export const Filtrado = ({ fields, onInputChange }) => {
  
  
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
      </Grid>

    </VStack>
  )
}
