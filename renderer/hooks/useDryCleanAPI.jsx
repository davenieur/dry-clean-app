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

    // dataPrenda = {nombre, tipo_servicio,id_sucursal, precio }
    const addPrenda = async (dataPrenda) => {
      try {
        console.log("addPrenda", dataPrenda)

        const listaPrecios = await window.SucursalesAPI.savePrendaPrecio(dataPrenda)
        return listaPrecios
      } catch (error) {
          console.error('Error al crear la prenda:', error);
      }

    }

    const deletePrenda = (prenda) => {
      console.log("deletePrenda", prenda)
    }

    const updatePrenda = (sucursal, prenda) => {
      const sucursalId = sucursal.id
      console.log("updatePrenda", sucursalId, prenda)
    }

    return {
        sucursales,
        loadingPrices,
        loadingSucursales,
        selectedSucursal,
        listaPrecios,
        selectSucursal,
        deletePrenda,
        updatePrenda,
        addPrenda
    };
  };
  
