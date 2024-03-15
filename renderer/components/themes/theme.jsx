import { extendTheme } from "@chakra-ui/react";
import "@fontsource/raleway"; 



const colors = {
    brand: {
      "primary": '#0D0D0D',
      "secondary": '#BF0B1A',
      "tertiary": '#03738C',
      "gray": '#414042',
      "white": '#F3F3F3',
      "dark-blue": "#03658C"
    }
};
  


const theme = extendTheme({
    colors
});

export default theme;