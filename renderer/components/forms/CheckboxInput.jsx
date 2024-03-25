import React from 'react'
import { Checkbox, HStack, Button, FormControl, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { ModifiableFormControl } from '../modifiables'

import { useForm } from '../../hooks'

const colorFormFields = {
    color: ''
  }
  

export const CheckboxInput = ({ index, colores, coloresDisponibles, handleToggle, handleDeleteCustomColor }) => {
    const { color, onInputChange } = useForm( colorFormFields );


    return (
        <HStack align="center" justify="center">
            <Checkbox
                onChange={() => handleToggle(color)}
                value={ color }
                isChecked={ colores.includes(color) }
            />
            
           
            <FormControl isInvalid={color===''} onChange={ onInputChange }>
                <HStack align="center" justify="center">
                    <Input type="text" value={ color } name="color" onChange={ onInputChange } w="100%"/>
                    <Button  w="fit-content" colorScheme='red'onClick={() => handleDeleteCustomColor(index) } >
                        <DeleteIcon />
                    </Button>
                </HStack>
            
                {color!=='' ? (
                    <FormHelperText>
                        Color de la prenda
                    </FormHelperText>
                    ) : (
                    <FormErrorMessage>Color requerido</FormErrorMessage>
                )}
            </FormControl>
                
           
           
           
        </HStack>

    )
}
