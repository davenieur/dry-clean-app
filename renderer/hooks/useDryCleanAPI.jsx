import { useState, useEffect } from 'react';


const useDryCleanAPI = ()  => {
    const [sucursales, setSucursales] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [selectedSucursal, setSelectedSucursal] = useState('');


  
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
        setSelectedSucursal(sucursales[0].nombre);
        setIsLoading(false);
      };
    
      fetchSucursales();
    }, []);

    const selectSucursal = (sucursal) => {
      console.log(sucursal)
      setSelectedSucursal(sucursal);
    }


    return {
        sucursales,
        isLoading,
        selectedSucursal,
        selectSucursal
    };
  };
  
  export default useDryCleanAPI;