import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react"

export const ModifiableNumberInput = ({ name }) => {
  return (
    <NumberInput min={ 0 } max={100000} step={50} name={ name }>
        <NumberInputField />
        <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
        </NumberInputStepper>
    </NumberInput>
  )
}
