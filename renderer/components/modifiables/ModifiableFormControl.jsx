import { useState } from "react"
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from "@chakra-ui/react"
import { ModifiableNumberInput } from "./ModifiableNumberInput"
import { ModifiableSelectMenu } from "./ModifiableSelectMenu"

export const ModifiableFormControl = ({ fieldName, value, error, label, type, helper, options, onChange }) => {
  
  
    const isError = value === '' || value === 0

    return (
        <FormControl isInvalid={isError} isRequired onChange={ onChange }>
            <FormLabel>{ label }</FormLabel>
            {
                type==="number" ? (
                    <ModifiableNumberInput name={ fieldName }/>
                    
                ): type==="menu" ? (
                    <ModifiableSelectMenu options={ options  } name={ fieldName } />
                ): <Input type={ type } value={ value } name={ fieldName }/>
            }
            
            {!isError ? (
                <FormHelperText>
                    { helper }
                </FormHelperText>
                ) : (
                <FormErrorMessage>{ error }</FormErrorMessage>
            )}
        </FormControl>
    )
}
