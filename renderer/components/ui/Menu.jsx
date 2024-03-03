import { IconButton } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";

export const NavbarToggler = (sites) => {
    

    return (
        <IconButton
        className="navbar-toggler navbar-toggler align-self-center"
        aria-label="Toggle navigation"
        icon={<FaBars />}
        variant="unstyled"
        onClick={() => {
            console.log("Hola")
        }}
        />
    );
};

