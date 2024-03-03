// Header.tsx
import { VStack, Image,  Text, Box, Link as ChakraLink, HStack, IconButton,useDisclosure, Menu, MenuButton, MenuList, MenuItem, Icon } from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons';
import { ModifiableAccordion, ModifiableAccordionItem, ModifiableMenu } from '../modifiables';
import { FaShop } from "react-icons/fa6";

export const CustomDrawer = () => {

  const route = useRouter()

    const sites = [
      { 
        nombre: "Sucursales",
        path: "/sucursales",
        iconUrl: "https://img.icons8.com/ios-filled/50/BF0B1A/shop.png",
        menuList: [
          {
            nombre: "Información",
            path: '/sucursales/informacion'
          },
          {
            nombre: "Lista de precios",
            path: '/sucursales/precios'
          },
          {
            nombre: "Clientes",
            path: '/sucursales/clientes'
          }
        ]
      },
      { 
        nombre: "Notas",
        path: "/notas",
        iconUrl: "https://img.icons8.com/ios-filled/50/BF0B1A/sticky-notes.png",
        menuList: [
          {
            nombre: "Ver notas",
            path: '/notas/ver'
          },
          {
            nombre: "Crear nueva nota",
            path: '/notas/crear'
          }
        ]
      }
      
    ]

  return (
    <VStack
      p="1rem"
      h="100%"
      gridArea="drawer"
      bg= "brand.white"
      w="fit-content"
    >
      {/*  logo */}
      
      <Link href={`/home`} >
        <Image
            src='/images/DRYlogo_orig.png'
            alt='DRY Logo'
            width="10rem"
            height="auto"
            transition='all 0.2s'
        />
      </Link>  
    
        <VStack>
          <ModifiableAccordion 
            children={
              sites.map((site, index) => (
                <ModifiableAccordionItem 
                  key={`acordion-de-${index}-${site.nombre}`}
                  nombre={ site.nombre }
                  iconUrl= { site.iconUrl }
                  description= { site.menuList }
                />
              )
            )}                  
          />
        </VStack>
     
    </VStack>
  );
};

