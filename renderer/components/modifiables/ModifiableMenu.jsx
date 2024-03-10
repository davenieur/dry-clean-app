import { IconButton, Menu, MenuButton, MenuList, Image, MenuItem, Text, HStack } from '@chakra-ui/react'

export const ModifiableMenu = ( { icon, nombre, menuList = [], bg, color, hoverBg, hoverColor, expandedBg, expandedColor } ) => {
  

  return(
    <Menu 
      transition='all 0.2s'
      
    >
      <MenuButton
        as={IconButton}
        aria-label={nombre}
        variant='solid'
        bg= { bg }
        p="1rem"
        display="flex"
        color={ color }
        flexDir="row"
        _hover={{ bg: hoverBg, color: hoverColor }}
        _expanded={{ bg: expandedBg, color: expandedColor }}
        _focus={{ boxShadow: 'outline' }}
      > 
        <HStack>
          <Text as="p" fontSize="md">{ nombre }</Text>
          { icon }
        </HStack>
      </MenuButton>
      
      
      <MenuList>
        { menuList }
      </MenuList>
    </Menu>
  )
}


