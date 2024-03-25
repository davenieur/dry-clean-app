import { DeleteIcon } from "@chakra-ui/icons";
import { FormControl, CheckboxGroup, Stack, Checkbox, FormHelperText, FormErrorMessage, Input, Button, Text, HStack, Icon } from "@chakra-ui/react"
import { CheckboxInput } from "./CheckboxInput";

export const ColorMenu = ({ colores, coloresDisponibles, handleToggle, handleAddCustomColor, handleDeleteCustomColor }) => {
  return (
    <FormControl isInvalid={ colores.length === 0 } >
        <CheckboxGroup name="colores" >
            <Stack direction="column">
                {
                    coloresDisponibles.map((color, index) => {
                        return color.isCustom ? (
                          
                            <CheckboxInput 
                                colores={ colores }
                                coloresDisponibles = { coloresDisponibles}
                                handleToggle={ handleToggle }
                                handleDeleteCustomColor = { handleDeleteCustomColor }
                                index={ index }
                            />    
                        ) : (
                            <Checkbox
                                key={`color-${index}`}
                                onChange={() => handleToggle(color.color)}
                                value={color.value}
                                isChecked={colores.includes(color.color)}
                          >
                            {color.color}
                          </Checkbox>
                          
                        );
                    })
                      
                }
            </Stack>
            
            <Button onClick={handleAddCustomColor} mt={2} colorScheme="teal">
                Agregar color 
            </Button>
        </CheckboxGroup>

        { colores.length !== 0 ? (
            <FormHelperText>
                Selecciona los colores de la prenda
            </FormHelperText>
            ) : (
            <FormErrorMessage>Colores requeridos</FormErrorMessage>
        )}
    </FormControl>
  )
}
