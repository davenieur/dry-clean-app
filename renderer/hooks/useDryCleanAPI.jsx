import { useState, useEffect } from 'react';


export const useDryCleanAPI = ()  => {
    // Setters y getters
    const [sucursales, setSucursales] = useState([]);
    
    const [loadingSucursales, setLoadingSucursales] = useState(true);

    const [loadingPrices, setLoadingPrices] = useState(true);

    const [selectedSucursal, setSelectedSucursal] = useState({});

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
        setLoadingSucursales(false)
      };
    
      fetchSucursales();
    }, []);

    const getListaPrecios = async (id) => {
      try {
        const listaPrecios = await window.SucursalesAPI.getListPrecios(id)
        return listaPrecios
      } catch (error) {
          console.error('Error al obtener la lista de precios:', error);
      }
    }

    const getListaNotas = async (id) => {
      try {
        const listaPrecios = await window.SucursalesAPI.getListPrecios(id)
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
        setLoadingPrices(false);
      };
    
      fetchListaPrecios();
    }, [ selectedSucursal ]);

    const selectSucursal = (sucursal) => {
      setSelectedSucursal(sucursal);
    }

    const addPrenda = async (dataPrenda) => {
      try {
        await window.SucursalesAPI.savePrendaPrecio(dataPrenda);
        const listaPrecios = await getListaPrecios(selectedSucursal.id);
        setListaPrecios(listaPrecios);
        setLoadingPrices(false);
      } catch (error) {
          console.error('Error al crear la prenda:', error);
      }

    }

    const deletePrenda = async (prenda_id) => {
      console.log("deletePrenda", prenda_id)
      try {
        await window.SucursalesAPI.deletePrenda(prenda_id);
        const listaPrecios = await getListaPrecios(selectedSucursal.id);
        setListaPrecios(listaPrecios);
        setLoadingPrices(false);
      } catch (error) {
          console.error('Error al eliminar la prenda:', error);
      }
    }

    const updatePrenda = async (dataPrenda) => {
      console.log("updatePrenda", dataPrenda);
      try {
        await window.SucursalesAPI.updatePrenda(dataPrenda);
        const listaPrecios = await getListaPrecios(selectedSucursal.id);
        setListaPrecios(listaPrecios);
        setLoadingPrices(false);
      } catch (error) {
          console.error('Error al actualizar la prenda:', error);
      }
    }

    return {
        sucursales,
        loadingPrices,
        loadingSucursales,
        selectedSucursal,
        listaPrecios: listaPrecios || [],        
        selectSucursal,
        deletePrenda,
        updatePrenda,
        addPrenda
    };
  };
  
