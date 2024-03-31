import { FormControl, Select, FormHelperText, FormErrorMessage, Button } from "@chakra-ui/react"
import { MdBuild } from "react-icons/md"
import { ModifiableModal, ModifiableForm } from "../modifiables"
import { useForm } from "../../hooks"

const fields = {
    new_tipo_servicio_nombre: '', 
    new_tipo_servicio_precio: ''
}


export const PrendaServicio = ({ prenda_servicio, onInputChange, listaPreciosServicios, handleAddCustomPrecioServicio, setIsComodin }) => {
    const { new_tipo_servicio_prenda, new_tipo_servicio_servicio, new_tipo_servicio_precio, onInputChange: onAddNewTipoServicioInputChange } = useForm(fields);

    const new_tipo_servicio_fields = [
        {
            fieldName: "new_tipo_servicio_prenda",
            type: "text",
            value:  new_tipo_servicio_prenda,
            label: "Prenda",
            helper: "Ingresa el nombre de la prenda",
            error: "Nombre de la prenda requerido"
        },
        {
            fieldName: "new_tipo_servicio_servicio",
            type: "text",
            value:  new_tipo_servicio_servicio,
            label: "Servicio",
            helper: "Ingresa el nombre del servicio",
            error: "Nombre del servicio requerido"
          },
        {
            fieldName: "new_tipo_servicio_precio",
            type: "number",
            value: new_tipo_servicio_precio,
            label: "Precio",
            helper: "Ingresa el precio del servicio",
            error: "Precio requerido"
        }
    ]
      
    const onAddNewTipoServicio = (new_tipo_servicio_prenda, new_tipo_servicio_servicio, new_tipo_servicio_precio) => {
        setIsComodin(true)
        handleAddCustomPrecioServicio (new_tipo_servicio_prenda, new_tipo_servicio_servicio, new_tipo_servicio_precio)
    }
  
  
    return (
    <FormControl isInvalid={ prenda_servicio === '' } onChange={ onInputChange }  w="fit-content">
        <Select 
            placeholder='Selecciona prenda - servicio' 
            name="prenda_servicio" 
            onChange={ onInputChange }
            w="20rem"
            mb="1rem"
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
 
        {/*Agregar prenda - servicio */}
        <ModifiableModal 
            leftIcon={<MdBuild />}
            colorScheme='blue'
            buttonText = "Agregar nuevo servicio"
            fontSize="sm"
            modalHeader="Agregar nuevo servicio"
            modalBody={    
            <ModifiableForm 
                fields={ new_tipo_servicio_fields }
                onChange={ onAddNewTipoServicioInputChange }
            />
            }
            onClick={() => onAddNewTipoServicio (new_tipo_servicio_prenda, new_tipo_servicio_servicio, new_tipo_servicio_precio) }
        />

        { prenda_servicio !== '' ? (
            <FormHelperText>
                Selecciona la prenda y el servicio
            </FormHelperText>
            ) : (
            <FormErrorMessage>Prenda y servicio requeridos</FormErrorMessage>
        )}
    </FormControl>
  )
}
