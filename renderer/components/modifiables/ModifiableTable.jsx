import { Table, Td, Th, Thead, Tr, TableContainer, TableCaption, Tbody, Tfoot } from "@chakra-ui/react";

export const ModifiableTable = ({ w, headers, onclickFunction, headAction, tableCaption, tbody }) => {
  
    const tableStyles = {
        width: w
    }

    return (
        <TableContainer  w={ w }>
            <Table variant='striped' colorScheme='teal'>
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
                <Tbody>
                    { tbody }|
                </Tbody>
            </Table>
        </TableContainer>
    );
}
