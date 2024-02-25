import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Image, Box, Heading, HStack, Text, UnorderedList, ListItem } from '@chakra-ui/react'

export const ModifiableAccordionItem = ({title, iconUrl, description}) => {
  return (
    <AccordionItem
        w="20rem"
        h="fit-content"
    >
        <Heading 
            as="h2"
            color="brand.gray"
        >
            <AccordionButton>
                <HStack as="span" flex='1' textAlign='left' w="20rem">
                    <Image
                        src={ iconUrl }
                        alt={ title }
                        width="1.5rem"
                        height="auto"
                    />

                    <Text color="brand.primary" fontSize="md">{ title }</Text>
                </HStack>
                <AccordionIcon />
            </AccordionButton>
        </Heading>
        <AccordionPanel w="20rem">
            <UnorderedList>
                {
                    description.map(( element, index ) => {
                        return(
                            <ListItem fontSize="sm" color="brand.primary">{element.title}</ListItem>
                        )
                    })
                }
            </UnorderedList>
           
        </AccordionPanel>
       
    </AccordionItem>

  )
}
