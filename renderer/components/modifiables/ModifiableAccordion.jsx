import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'

export const ModifiableAccordion = ({children}) => {
  return (
    <Accordion 
        allowToggle
        w="20rem"
    >
        {children}
    </Accordion>
  )
}
