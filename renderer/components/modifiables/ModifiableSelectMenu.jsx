import { RadioGroup, Stack, Radio } from "@chakra-ui/react"
import { MdArrowDropDown } from "react-icons/md"

export const ModifiableSelectMenu = ({ options = [], name }) => {

  return (
    <RadioGroup name={ name } >
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
