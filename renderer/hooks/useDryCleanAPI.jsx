import { useState, useEffect } from 'react';


const useDryCleanAPI = ()  => {
    const [sucursales, setSucursales] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [selectedSucursal, setSelectedSucursal] = useState('');

    const [listaPrecios, setListaPrecios] = useState([])
    

    const getSucursales = async () => {
        try {
            const sucursales = await window.SucursalesAPI.getSucursales();
            return sucursales
        } catch (error) {
            console.error('Error al obtener las sucursales:', error);
        }
    };
    
    // Obtenemos la lista de sucursales
    useEffect(() => {
      const fetchSucursales = async () => {
        const sucursales = await getSucursales();
        setSucursales(sucursales);
        setSelectedSucursal(sucursales[0]);
        setIsLoading(false);
      };
    
      fetchSucursales();
    }, []);

    const getListaPrecios = async (id) => {
      try {
        const listaPrecios = await window.SucursalesAPI.getListPrecios(id)
        console.log(listaPrecios)

        return listaPrecios
    } catch (error) {
        console.error('Error al obtener la lista de precios:', error);
    }

    }

    // Obtenemos la lista de precios
    useEffect(() => {
      const fetchListaPrecios = async () => {
        const listaPrecios = await getListaPrecios(selectedSucursal.id);
        setListaPrecios(listaPrecios);
        setIsLoading(false);
      };
    
      fetchListaPrecios();
    }, [ selectedSucursal ]);

    const selectSucursal = (sucursal) => {
      setSelectedSucursal(sucursal);
    }


    return {
        sucursales,
        isLoading,
        selectedSucursal,
        listaPrecios,
        selectSucursal
    };
  };
  
  export default useDryCleanAPI;