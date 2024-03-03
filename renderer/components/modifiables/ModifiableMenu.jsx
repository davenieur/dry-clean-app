import { IconButton, Menu, MenuButton, MenuList, Image, MenuItem, Text, HStack } from '@chakra-ui/react'

export const ModifiableMenu = ( { iconUrl, nombre, menuList = [] } ) => {
  

  return(
    <Menu 
      transition='all 0.2s'
      
    >
      {
        iconUrl ? (

          <MenuButton
            as={IconButton}
            aria-label={nombre}
            variant='solid'
            bg="brand.tertiary"
            p="1rem"
            display="flex"
            color="brand.white"
            flexDir="row"
            _hover={{ bg: 'brand.secondary'}}
            _expanded={{ bg: 'brand.dark-blue' }}
            _focus={{ boxShadow: 'outline' }}
          > 
            <HStack>
              <Text as="p" fontSize="md">{ nombre }</Text>
              <Image
                src={ iconUrl }
                alt={ nombre }
                width="1.5rem"
                height="auto"
              />
            </HStack>
          </MenuButton>

          
        ) : null
      }
      
      <MenuList>
        { menuList }
      </MenuList>
    </Menu>
  )
}


