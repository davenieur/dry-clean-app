const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron')



contextBridge.exposeInMainWorld('loginAPI', {
  validate: (obj)=>ipcRenderer.invoke('validate',obj),

});
 