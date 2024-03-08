import { VStack } from "@chakra-ui/react"
import { ModifiableFormControl } from "./ModifiableFormControl"

export const ModifiableForm = ({ fields = [], onChange }) => {
    
  
    return (
      <VStack w="100%">
        {
            fields.map(( field, index ) => {
                const { fieldName, value, label, helper, error, type, options } = field;

                return(
                    <ModifiableFormControl 
                        key={`form-label-${index}`}
                        value={ value }
                        label = { label }
                        helper={ helper }
                        error = { error }
                        type={ type }
                        fieldName={ fieldName }
                        options={ options }
                        onChange = { onChange }
                    />
                )
            })
        }
        
      </VStack>
    )
}
