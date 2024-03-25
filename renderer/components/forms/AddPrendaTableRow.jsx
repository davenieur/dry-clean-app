import React from 'react'
import { useForm } from '../../hooks'
import { Td, Tr, ButtonGroup } from '@chakra-ui/react'
import { ModifiableForm, ModifiableAlert, ModifiableModal } from '../modifiables'
import { FaTrash } from 'react-icons/fa'
import { MdBuild } from 'react-icons/md'
import Swal from 'sweetalert2';


export const AddPrendaTableRow = ({ id, prendaNombre, prendaPrecio, prendaServicio, addOrUpdatePrenda, deletePrenda, selectedSucursal }) => {
    const { nombre, precio, tipo_servicio, onInputChange: onInputChange } = useForm( { nombre: prendaNombre, precio: prendaPrecio, tipo_servicio: prendaServicio }, { });
    

    // Eliminar prenda
    const onDeletePrenda = async (id_prenda) => {

      const dataPrenda = {
        id_prenda: id_prenda,
      }
    
      try {
        // Intenta eliminar la prenda
        await deletePrenda(dataPrenda);
    
        // Si se elimina correctamente, muestra un mensaje de éxito
        Swal.fire({
          title: "Prenda eliminada",
          text: `La prenda ha sido eliminada correctamente.`,
          icon: "success"
        });
      } catch (error) {
        // Si hay un error al eliminar la prenda, muestra un mensaje de error
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error al intentar eliminar la prenda.",
          icon: "error"
        });
      }
    };
    
    // Actualizar prenda
    const onUpdatePrenda = async (id) => {
      const dataPrenda = {
        id_prenda: id,
        nombre: nombre,
        precio: precio || 0,
        tipo_servicio: tipo_servicio,
        id_sucursal: selectedSucursal.id
      }
    
      try {
        // Intenta actualizar la prenda
        await addOrUpdatePrenda(dataPrenda);
    
        // Si se elimina correctamente, muestra un mensaje de éxito
        Swal.fire({
          title: "Prenda actualizada",
          text: `La prenda ha sido actualizada correctamente.`,
          icon: "success"
        });
      } catch (error) {
        // Si hay un error al eliminar la prenda, muestra un mensaje de error
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error al intentar actualizar la prenda.",
          icon: "error"
        });
      }
    }

    const updateFields = [
        {
          fieldName: "nombre",
          type: "text",
          value: nombre,
          label: "Nombre",
          helper: "Ingresa el nombre de la prenda",
          error: "Nombre de la prenda requerido"
        },
        {
          fieldName: "precio",
          type: "number",
          value: precio,
          label: "Precio",
          helper: "Ingresa el precio de la prenda",
          error: "Precio requerido"
        },
        {
          fieldName: "tipo_servicio",
          type: "menu",
          value: tipo_servicio,
          label: "Tipo de servicio",
          helper: "Selecciona el tipo de servicio",
          error: "Tipo de servicio requerido",
          options: ["Tintoreria", "Planchado", "Lavado", "Teñido", "Pintada 1 color"]
        }
      ]
      
      return(
        <Tr>
            <Td>{ id }</Td>
            <Td>{ prendaNombre }</Td>
            <Td>{ prendaServicio  }</Td>
            <Td> { prendaPrecio ? `$${prendaPrecio}` : 'null'} </Td>
            <Td> 
              <ButtonGroup  spacing='.5rem'>
                {/* Eliminar prenda */}
                <ModifiableAlert 
                  leftIcon={<FaTrash />}
                  fontSize="sm"
                  buttonText="Eliminar"
                  dialogBody={`¿Eliminar ${ prendaNombre }?`} 
                  onClick={ onDeletePrenda } 
                  param = { id }
                />

                {/* Actualizar prenda */}
                <ModifiableModal 
                  leftIcon={<MdBuild />}
                  colorScheme='blue'
                  buttonText = "Editar"
                  fontSize="sm"
                  modalHeader={ `Editar ${ prendaNombre }`}
                  modalBody={    
                    <ModifiableForm 
                      fields={ updateFields }
                      onChange={ onInputChange }
                    />
                  }
                  onClick={() => onUpdatePrenda(id) }
                />

              </ButtonGroup>
            </Td>
        </Tr>
    )
}
