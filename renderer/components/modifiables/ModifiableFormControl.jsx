import { useState } from "react"
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from "@chakra-ui/react"
import { ModifiableNumberInput } from "./ModifiableNumberInput"
import { ModifiableSelectMenu } from "./ModifiableSelectMenu"

export const ModifiableFormControl = ({ fieldName, value, error, label, type, helper, options, onChange }) => {
  
  
    const isError = value === '' || value === null

    return (
        <FormControl isInvalid={isError} isRequired onChange={ onChange }>
            <FormLabel>{ label }</FormLabel>
            {
                type==="number" ? (
                    <ModifiableNumberInput name={ fieldName } defaultValue={ value } onChange={ onChange }/>
                    
                ): type==="menu" ? (
                    <ModifiableSelectMenu options={ options  } name={ fieldName } value={ value } onChange={ onChange }/>
                ): <Input type={ type } value={ value } name={ fieldName }  onChange={ onChange }/>
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
