// RootLayout.jsx
import React, { useState } from 'react';
import { Drawer, Header } from '../ui'
// import { Header, Footer } from '@/components';
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import "@fontsource/roboto"; 

export const RootLayout = ({ children, pageProps }) => {

  const gridTemplateAreas = useBreakpointValue({
    base:  `"drawer main"
    "drawer main"`
  });

  const gridTemplateRows = useBreakpointValue({
    base:  "1fr"
  })

  const gridTemplateColumns = useBreakpointValue({
    base: "auto 1fr",
    md: "auto 1fr",
    lg: "auto 1fr",
    xl: "auto 1fr"
  })
  

  return (
    <Grid
      templateRows={gridTemplateRows}
      templateColumns={gridTemplateColumns}
      templateAreas={gridTemplateAreas}
      w='100vw'
      h="100vh"
      overflowX="hidden"
    >
      <Drawer pageProps={pageProps} />
    
      <GridItem
        as='main'
        gridArea="main"
        bg="brand.white"
        fontFamily="Roboto"
      >
        {children}
      </GridItem>

    </Grid>
  );
};

