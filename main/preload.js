const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron')



contextBridge.exposeInMainWorld('SucursalesAPI', {
  getSucursales: ()=>ipcRenderer.invoke('Sucursal:get_list'),
  getListPrecios: (id, registrado=false)=>ipcRenderer.invoke('Sucursal:get_list_precios',id,registrado),
  saveListPrecios: (list_precios)=>ipcRenderer.invoke('Sucursal:update_list_precios',list_precios),
  savePrendaPrecio: (dataPrenda) =>ipcRenderer.invoke('Sucursal:save_prenda',dataPrenda),
  
  saveNota: (dataNota) =>ipcRenderer.invoke('Notas:save_nota',dataNota),
  getListNotas: (filtros) =>ipcRenderer.invoke('Notas:get_list_notas',filtros),
  imprimirTicket: (dataNotas,nombre_cliente) =>ipcRenderer.invoke('Notas:imprimir_ticket',dataNotas,nombre_cliente),
  eliminarNota: (id_nota) =>ipcRenderer.invoke('Notas:eliminar_nota',id_nota),
});
