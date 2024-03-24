import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks'
import { Td, Tr, ButtonGroup, Button, FormControl, FormHelperText, FormErrorMessage } from '@chakra-ui/react'
import { ModifiableNumberInput } from '../modifiables'
import { FaTrash } from 'react-icons/fa'
import { Select } from '@chakra-ui/react'
import Swal from 'sweetalert2';

const addPrendaFields = {
    num_prendas: '', 
    prenda_servicio: '', 
    color: ''
}

const colores = [
    {
        color: "Negro",
        value: "negro"
    },
    {
        color: "Gris",
        value: "gris"
    },
    {
        color: "Azul", 
        value: "azul"
    },
    {
        color: "Blanco",
        value: "blanco"
    },
    {
        color: "Café",
        value: "cafe"
    }
]


export const AddNotaTableRow = ({ prendaIndex, deletePrenda, listaNotas, updatePrenda }) => {
    const { num_prendas, prenda_servicio, color, onInputChange: onInputChange } = useForm(addPrendaFields);

    const [precio, setPrecio] = useState(null);

    const [prendaId, setPrendaId] = useState('')

    const [precioTotal, setPrecioTotal] = useState(null)

    useEffect(() => {
        const prendaSeleccionada = listaNotas.find(elemento => elemento.value === prenda_servicio);
        const precio = prendaSeleccionada ? prendaSeleccionada.precio : null; 
        setPrecio(precio);
    }, [prenda_servicio, listaNotas]); 
    
    useEffect(() => {
        const prendaSeleccionada = listaNotas.find(elemento => elemento.value === prenda_servicio);
        const id = prendaSeleccionada ? prendaSeleccionada.id : null; 
        setPrendaId(id)
    }, [prenda_servicio, listaNotas]); 
    

    useEffect(() => {
        setPrecioTotal(num_prendas * precio);
    }, [num_prendas, precio]); // Añade num_prendas y precio como dependencias
    
    useEffect(() => {
        updatePrenda(prendaIndex, prendaId, num_prendas, prenda_servicio, color, precio);
    }, [ num_prendas, prenda_servicio, color, precio ]); 


   
    return(
        <Tr>
            <Td>
                {/* Número de prendas */}
                <FormControl isInvalid={ num_prendas === '' }  onChange={ onInputChange }>
                    <ModifiableNumberInput name={ "num_prendas" } defaultValue={ '' } onChange={ onInputChange }/>
                    { num_prendas !== '' ? (
                        <FormHelperText>
                            Ingresa el número de prendas
                        </FormHelperText>
                        ) : (
                        <FormErrorMessage>Número de prendas requerido</FormErrorMessage>
                    )}
                </FormControl>
            </Td>
           
            <Td>
                <FormControl isInvalid={ prenda_servicio === '' } onChange={ onInputChange }>
                <Select placeholder='Selecciona prenda - servicio' name="prenda_servicio" onChange={ onInputChange }>
                    {
                        listaNotas.map(( opcion, index ) => {
                            const { value, nombre } = opcion

                            return(
                                <option key={`prenda-servicio-${index}`} value={ value }>{ nombre }</option>
                            )   
                        })
                    }

                </Select>

                { prenda_servicio !== '' ? (
                    <FormHelperText>
                        Selecciona la prenda y el servicio
                    </FormHelperText>
                    ) : (
                    <FormErrorMessage>Prenda y servicio requeridos</FormErrorMessage>
                )}
                </FormControl>
            </Td>

            <Td>
                <FormControl isInvalid={ color === '' } >
                <Select placeholder='Selecciona el color' name="color" onChange={ onInputChange }>
                    {
                        colores.map(( color, index ) => {
                            return( <option key={`color-${index}`} value={ color.value }>{ color.color }</option> )
                        })
                    }
                </Select>

                { color !== '' ? (
                    <FormHelperText>
                        Selecciona el color
                    </FormHelperText>
                    ) : (
                    <FormErrorMessage>Color requerido</FormErrorMessage>
                )}
                </FormControl>
            </Td>
           

            <Td>{ precio }</Td>
            <Td>{ precioTotal }</Td>
            <Td> 
              <Button w="100%" colorScheme='red' fontSize="md" onClick={() => deletePrenda(prendaIndex) }>
                <FaTrash />
              </Button>
            </Td>
        </Tr>
    )
}
