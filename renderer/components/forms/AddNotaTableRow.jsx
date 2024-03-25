import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks'
import { Td, Tr, CheckboxGroup, Checkbox, Button, FormControl, FormHelperText, FormErrorMessage, Stack } from '@chakra-ui/react'
import { ModifiableNumberInput } from '../modifiables'
import { FaTrash } from 'react-icons/fa'
import { Select } from '@chakra-ui/react'
import Swal from 'sweetalert2';
import { ColorMenu } from './ColorMenu'

const addPrendaFields = {
    num_prendas: '', 
    prenda_servicio: '', 
    colores: []
}



export const AddNotaTableRow = ({ prendaIndex, deletePrenda,  listaPreciosServicios, updatePrenda }) => {
    const { num_prendas, prenda_servicio, onInputChange: onInputChange } = useForm(addPrendaFields);  

    // Precio de la prenda
    const [precio, setPrecio] = useState(null);
    
    // Id de la prenda elegida
    const [prendaId, setPrendaId] = useState('')

    // Colores de la prenda
    const [colores, setColores] = useState([])

    const [coloresDisponibles, setColoresDisponibles] = useState(
        [
            {
                color: "Negro",
                value: "negro",
                isCustom: false
            },
            {
                color: "Gris",
                value: "gris",
                isCustom: false
            },
            {
                color: "Azul", 
                value: "azul",
                isCustom: false
            },
            {
                color: "Blanco",
                value: "blanco",
                isCustom: false
            },
            {
                color: "Café",
                value: "cafe",
                isCustom: false
            }
        ]
    )

    // Precio total de la prenda
    const [precioTotal, setPrecioTotal] = useState(null)

    // Cambio de color
    const handleToggle = (color) => {
        const isChecked = colores.includes(color);
        if (isChecked) {
            setColores(colores.filter((c) => c !== color));
        } else {
            setColores([...colores, color]);
        }
    }

    const handleAddCustomColor = () => {
        setColoresDisponibles([...coloresDisponibles, { color: '', value: '', isCustom: true }])
    }

    const handleDeleteCustomColor = (color_index) => {
        const newColoresDisponibles = coloresDisponibles.filter((_, index) => index !== color_index);
        setColoresDisponibles(newColoresDisponibles);
    }

    // Actualizando el precio de la prenda elegida
    useEffect(() => {
        const prendaSeleccionada = listaPreciosServicios.find(elemento => elemento.value === prenda_servicio);
        const precio = prendaSeleccionada ? prendaSeleccionada.precio : null; 
        setPrecio(precio);
    }, [prenda_servicio, listaPreciosServicios]); 
    
    // Actualizando el id de la prenda elegida
    useEffect(() => {
        const prendaSeleccionada = listaPreciosServicios.find(elemento => elemento.value === prenda_servicio);
        const id = prendaSeleccionada ? prendaSeleccionada.id : null; 
        setPrendaId(id)
    }, [prenda_servicio, listaPreciosServicios]); 
    
    // Modificando el precio total
    useEffect(() => {
        setPrecioTotal(num_prendas * precio);
    }, [num_prendas, precio]); 
    
    // Actualizar el renglon de cada 
    useEffect(() => {
        updatePrenda(prendaIndex, prendaId, num_prendas, prenda_servicio, colores, precio);
    }, [ num_prendas, prenda_servicio, colores, precio ]); 

    return(
        <Tr>
            <Td  w="10rem">
                {/* Número de prendas */}
                <FormControl isInvalid={ num_prendas === '' }  onChange={ onInputChange }  w="fit-content">
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
           
            <Td w="25rem">
                <FormControl isInvalid={ prenda_servicio === '' } onChange={ onInputChange }  w="fit-content">
                    <Select 
                        placeholder='Selecciona prenda - servicio' 
                        name="prenda_servicio" 
                        onChange={ onInputChange }
                        w="20rem"
                    >
                        {
                            listaPreciosServicios.map(( opcion, index ) => {
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

            <Td w="20rem">
                <ColorMenu 
                    colores={ colores } 
                    coloresDisponibles= { coloresDisponibles } 
                    handleToggle = { handleToggle }
                    handleAddCustomColor = { handleAddCustomColor }
                    handleDeleteCustomColor = { handleDeleteCustomColor }
                />
            </Td>
           

            <Td w="10rem">{ precio }</Td>
            <Td w="10rem">{ precioTotal }</Td>
            <Td> 
              <Button w="100%" colorScheme='red' fontSize="md" onClick={() => deletePrenda(prendaIndex) }>
                <FaTrash />
              </Button>
            </Td>
        </Tr>
    )
}
