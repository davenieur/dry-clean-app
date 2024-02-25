// Header.tsx
import { VStack, Image,  Text, Box, Link as ChakraLink, HStack, IconButton,useDisclosure, Menu, MenuButton, MenuList, MenuItem, Icon } from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons';
import { ModifiableAccordion, ModifiableAccordionItem } from '../modifiables';
import { FaShop } from "react-icons/fa6";

export const Drawer = ({ pageProps }) => {

  const route = useRouter()

    const sites = [
      { 
        title: "Sucursales",
        path: "/sucursales",
        iconUrl: "https://img.icons8.com/ios-filled/50/BF0B1A/shop.png",
        description: [
          {
            title: "Información",
            path: '/sucursales/informacion'
          },
          {
            title: "Lista de precios",
            path: '/sucursales/precios'
          },
          {
            title: "Clientes",
            path: '/sucursales/clientes'
          }
        ]
      },
      { 
        title: "Notas",
        path: "/notas",
        iconUrl: "https://img.icons8.com/ios-filled/50/BF0B1A/sticky-notes.png",
        description: [
          {
            title: "Ver notas",
            path: '/notas/ver'
          },
          {
            title: "Crear nueva nota",
            path: '/notas/crear'
          }
        ]
      }
      
    ]

  const { isOpen, onToggle } = useDisclosure()


  return (
    <VStack
      p="1rem"
      h="100%"
      gridArea="drawer"
      bg= {isOpen ? "brand.white" : "white"}
      w="fit-content"
    >
        
      < HStack w="100%" h="4rem">
          <IconButton 
              aria-label='Menu' 
              icon={<HamburgerIcon />} 
              onClick={onToggle}
              bg="brand.tertiary"
              color="brand.white"
          />

          
          <Link href={`/`} >
            <Image
                src='/images/DRYlogo_orig.png'
                alt='DRY Logo'
                width="10rem"
                height="auto"
                display={isOpen ? "block" : "none" }
                transition='all 0.2s'
            />
          </Link>  
        </HStack>

        {
          sites.map(( site, index) => {
            return(
              <Menu 
                placement="right"
                transition='all 0.2s'
              >
                <MenuButton
                  as={IconButton}
                  aria-label={site.title}
                  variant='solid'
                  display={isOpen ? "none" : "flex" }
                  p="1rem"
                >
                  <Image
                    src={ site.iconUrl }
                    alt={ site.title }
                    width="1.5rem"
                    height="auto"
                  />
                </MenuButton>
                <MenuList>
                 
                  {
                    site.description.map(( element, index ) => {
                      return(
                          <MenuItem key={ index } fontSize="sm" color="brand.primary">{element.title}</MenuItem>
                      )
                    })
                  }
              
                </MenuList>
              </Menu>
            )
          })
        }
        <VStack
          display={isOpen ? "block" : "none" }
        >
          <ModifiableAccordion 
            children={sites.map((site, index) => (
              <ModifiableAccordionItem 
                key={ index }
                title={ site.title }
                iconUrl= { site.iconUrl }
                description= { site.description }
              />
            ))}                  
          />
        </VStack>
     
    </VStack>
  );
};

