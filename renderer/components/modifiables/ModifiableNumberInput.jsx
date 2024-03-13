import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react"

export const ModifiableNumberInput = ({ name, defaultValue }) => {
  return (
    <NumberInput step={50} name={ name } defaultValue= { defaultValue }>
        <NumberInputField />
        <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
        </NumberInputStepper>
    </NumberInput>
  )
}
