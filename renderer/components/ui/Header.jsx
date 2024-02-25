// Header.jsx
import { HStack, Link, IconButton, Show, useDisclosure } from '@chakra-ui/react';
import { FaBars } from "react-icons/fa";
import { useRouter } from 'next/router';
import Image from "next/image";
import React from 'react';
// import { LanguageToggle } from '.';
// import ColorModeToggle from './ColorModeToggle';

export const Header = ({ pageProps }) => {

//   const { locale } = pageProps;

    const { isOpen, onToggle } = useDisclosure()

    const route = useRouter()

    return (
        <HStack
        as='header'
        gridArea="header"
        w="100vw"
        h="fit-content"
        bg='brand.white'
        p="1rem"
        spacing="md"
        justify="space-between"
        >
        
            <Link href={`/`}  >
                <Image
                src='/images/DRYlogo_orig.png'
                alt='DRY Logo'
                width="200"
                height="100"
                />
            </Link>

            <Show below="md">
                <IconButton aria-label='Menu' icon={<FaBars />} onClick={onToggle}/>
            </Show>

           

        
        </HStack>
    );
};
