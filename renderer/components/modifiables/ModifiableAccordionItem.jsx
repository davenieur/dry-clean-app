import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Image, Box, Heading, HStack, Text, UnorderedList, ListItem, Link } from '@chakra-ui/react'

export const ModifiableAccordionItem = ({ nombre, iconUrl, description = []} ) => {
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
                        alt={ nombre }
                        width="1.5rem"
                        height="auto"
                    />

                    <Text color="brand.primary" fontSize="md">{ nombre }</Text>
                </HStack>
                <AccordionIcon />
            </AccordionButton>
        </Heading>
        <AccordionPanel w="20rem">
            <UnorderedList>
                {
                    description.map(( element, index ) => {
                        return(
                            <Link href={element.path}>
                                <ListItem 
                                    key={`list-item-${ element.nombre }-${ index }`} 
                                    fontSize="sm" 
                                    color="brand.primary"
                                >
                                    {element.nombre}
                                </ListItem>
                            </Link>
                        )
                    })
                }
            </UnorderedList>
        
        </AccordionPanel>
    
       
    </AccordionItem>

  )
}
