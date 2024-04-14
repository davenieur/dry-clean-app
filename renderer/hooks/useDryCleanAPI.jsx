import { useState, useEffect } from 'react';

export const useDryCleanAPI = ()  => {
    // Setters y getters
    const [sucursales, setSucursales] = useState([]);
    const [listaNotas, setListaNotas] = useState([])
    const [selectedSucursal, setSelectedSucursal] = useState({});
    const [listaPrecios, setListaPrecios] = useState([]);

    const getSucursales = async () => {
        try {
            const sucursales = await window.SucursalesAPI.getSucursales();
            return sucursales;
        } catch (error) {
            console.error('Error al obtener las sucursales:', error);
        }
    };
    
    const getListaPrecios = async (id) => {
        try {
            const listaPrecios = await window.SucursalesAPI.getListPrecios(id);
            
            return listaPrecios;
        } catch (error) {
            console.error('Error al obtener la lista de precios:', error);
        }
    }
    // {sucursal_id,num_nota,cliente_name,fecha_desde,fecha_hasta
    const getListaNotas = async(dataPrenda) => {
        try {
            const listaNotas = await window.SucursalesAPI.getListNotas(dataPrenda);
            const listaNotasArray = Object.values(listaNotas);
            return listaNotasArray;
        } catch (error) {
            console.error('Error al obtener la lista de notas:', error);
        }
    }

    useEffect(() => {
        const fetchSucursales = async () => {
            const sucursales = await getSucursales();
            setSucursales(sucursales);
            setSelectedSucursal(sucursales[0]);
        };
    
        fetchSucursales();
    }, []);

    useEffect(() => {
        if (selectedSucursal.id) {
            const fetchListaPrecios = async () => {
                const listaPrecios = await getListaPrecios(selectedSucursal.id);
                setListaPrecios(listaPrecios);
            };
        
            fetchListaPrecios();
        }
    }, [selectedSucursal]);

    const selectSucursal = (sucursal) => {
        setSelectedSucursal(sucursal);
    }

    const addNota = async(dataNota) => {

        try {
            const status = await window.SucursalesAPI.saveNota(dataNota);
            console.log(status)
            
        } catch (error) {
            throw new Error(error);
        }
    } 

    const addOrUpdatePrenda = async (dataPrenda) => {
        const { id_prenda } = dataPrenda

        try {
            if (id_prenda) {
                await window.SucursalesAPI.updatePrenda(dataPrenda);
            } else {
                await window.SucursalesAPI.savePrendaPrecio(dataPrenda);
            }
            
            const listaPrecios = await getListaPrecios(selectedSucursal.id);
            setListaPrecios(listaPrecios);
        } catch (error) {
            throw new Error(error);
        }
    }

    const printTicket = async(dataNotas, nombre_cliente) => {
        try { 
            await window.SucursalesAPI.imprimirTicket(dataNotas, nombre_cliente);
        } catch (error) {
            throw new Error(error);
        }
    }

    const deletePrenda = async (dataPrenda) => {
        const { id_prenda } = dataPrenda
    
        try {
            // Verificar que los IDs no sean null
            if (id_prenda === undefined ) {
                throw new Error('El id de la prenda no puede ser undefined.');
            }
            
            // Llamar a la función para eliminar la prenda
            await window.SucursalesAPI.deletePrenda(dataPrenda);
            
            // Obtener y actualizar la lista de precios
            const listaPrecios = await getListaPrecios(selectedSucursal.id); // Pasar el ID de la sucursal seleccionada
            setListaPrecios(listaPrecios);
        } catch (error) {
            // Lanzar una excepción en caso de error
            throw new Error(error);
        }
    };

    const deleteNota= async (dataNota) => {
        const { nota_id } = dataNota
        try {
            // Verificar que los IDs no sean null
            if (nota_id === undefined ) {
                throw new Error('El id de la nota no puede ser undefined.');
            }
            // Llamar a la función para eliminar la prenda
            await window.SucursalesAPI.deleteNota(dataNota);
        } catch (error) {
            // Lanzar una excepción en caso de error
            throw new Error(error);
        }
    };
      

    return {
        sucursales,
        selectedSucursal,
        listaPrecios: listaPrecios || [],       
        getListaNotas,
        addNota,
        selectSucursal,
        deletePrenda,
        addOrUpdatePrenda,
        deleteNota,
        printTicket
    };
};
