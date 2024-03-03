import { Table, Td, Th, Thead, Tr, TableContainer, TableCaption, Tbody } from "@chakra-ui/react";

export const ModifiableTable = ({ w, headers, tableCaption, tbody, p }) => {
  
    const tableStyles = {
        width: w,
        padding: p
    }

    return (
        <TableContainer style={ tableStyles }>
            <Table colorScheme='teal' size='sm' >
                <TableCaption>{ tableCaption }</TableCaption>
                <Thead>
                    <Tr>
                        {
                            headers.map(( header, index ) => (
                                <Th key={`row-${ header }-${ index }`}>{ header }</Th>
                            ))
                        }         
                    
                    </Tr>
                </Thead>
                <Tbody fontFamily="Roboto">
                    { tbody }
                </Tbody>
            </Table>
        </TableContainer>
    );
}
