import { RadioGroup, Stack, Radio, useRadioGroup } from "@chakra-ui/react"

export const ModifiableSelectMenu = ({ options = [], name, value }) => {
  return (
    <RadioGroup name={ name } defaultValue={ value }>
      <Stack direction='column' >
        {
            options.map(( option, index ) => {
                return(
                    <Radio  size='md' key={`select-menu-item-${index}`} value={option}>{ option }</Radio>
                )
            })
        }
      </Stack>
    </RadioGroup>
  )
}
