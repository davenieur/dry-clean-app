(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./main/preload.js ***!
  \*************************/
const {
  ipcRenderer
} = __webpack_require__(/*! electron */ "electron");
const {
  contextBridge
} = __webpack_require__(/*! electron */ "electron");
contextBridge.exposeInMainWorld('SucursalesAPI', {
  getSucursales: () => ipcRenderer.invoke('Sucursal:get_list'),
  getListPrecios: (id, registrado = false) => ipcRenderer.invoke('Sucursal:get_list_precios', id, registrado),
  saveListPrecios: list_precios => ipcRenderer.invoke('Sucursal:update_list_precios', list_precios),
  savePrendaPrecio: dataPrenda => ipcRenderer.invoke('Sucursal:save_prenda', dataPrenda),
  deletePrenda: prenda_id => ipcRenderer.invoke('Sucursal:delete_prenda', prenda_id),
  saveNota: dataNota => ipcRenderer.invoke('Notas:save_nota', dataNota),
  updatePrenda: dataPrenda => ipcRenderer.invoke('Sucursal:update_prenda', dataPrenda),
  getListNotas: filtros => ipcRenderer.invoke('Notas:get_list_notas', filtros),
  imprimirTicket: (dataNotas, nombre_cliente) => ipcRenderer.invoke('Notas:imprimir_ticket', dataNotas, nombre_cliente),
  eliminarNota: id_nota => ipcRenderer.invoke('Notas:eliminar_nota', id_nota)
});
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkEsTUFBTTtFQUFFQTtBQUFZLENBQUMsR0FBR0MsbUJBQU8sQ0FBQywwQkFBVSxDQUFDO0FBQzNDLE1BQU07RUFBRUM7QUFBYyxDQUFDLEdBQUdELG1CQUFPLENBQUMsMEJBQVUsQ0FBQztBQUk3Q0MsYUFBYSxDQUFDQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUU7RUFDL0NDLGFBQWEsRUFBRUEsQ0FBQSxLQUFJSixXQUFXLENBQUNLLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztFQUMxREMsY0FBYyxFQUFFQSxDQUFDQyxFQUFFLEVBQUVDLFVBQVUsR0FBQyxLQUFLLEtBQUdSLFdBQVcsQ0FBQ0ssTUFBTSxDQUFDLDJCQUEyQixFQUFDRSxFQUFFLEVBQUNDLFVBQVUsQ0FBQztFQUNyR0MsZUFBZSxFQUFHQyxZQUFZLElBQUdWLFdBQVcsQ0FBQ0ssTUFBTSxDQUFDLDhCQUE4QixFQUFDSyxZQUFZLENBQUM7RUFDaEdDLGdCQUFnQixFQUFHQyxVQUFVLElBQUlaLFdBQVcsQ0FBQ0ssTUFBTSxDQUFDLHNCQUFzQixFQUFDTyxVQUFVLENBQUM7RUFDdEZDLFlBQVksRUFBR0MsU0FBUyxJQUFJZCxXQUFXLENBQUNLLE1BQU0sQ0FBQyx3QkFBd0IsRUFBQ1MsU0FBUyxDQUFDO0VBQ2xGQyxRQUFRLEVBQUdDLFFBQVEsSUFBSWhCLFdBQVcsQ0FBQ0ssTUFBTSxDQUFDLGlCQUFpQixFQUFDVyxRQUFRLENBQUM7RUFDckVDLFlBQVksRUFBR0wsVUFBVSxJQUFJWixXQUFXLENBQUNLLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRU8sVUFBVSxDQUFDO0VBQ3JGTSxZQUFZLEVBQUdDLE9BQU8sSUFBSW5CLFdBQVcsQ0FBQ0ssTUFBTSxDQUFDLHNCQUFzQixFQUFDYyxPQUFPLENBQUM7RUFDNUVDLGNBQWMsRUFBRUEsQ0FBQ0MsU0FBUyxFQUFDQyxjQUFjLEtBQUl0QixXQUFXLENBQUNLLE1BQU0sQ0FBQyx1QkFBdUIsRUFBQ2dCLFNBQVMsRUFBQ0MsY0FBYyxDQUFDO0VBQ2pIQyxZQUFZLEVBQUdDLE9BQU8sSUFBSXhCLFdBQVcsQ0FBQ0ssTUFBTSxDQUFDLHFCQUFxQixFQUFDbUIsT0FBTztBQUM1RSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL215LW5leHRyb24tYXBwL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL21haW4vcHJlbG9hZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImNvbnN0IHsgaXBjUmVuZGVyZXIgfSA9IHJlcXVpcmUoJ2VsZWN0cm9uJylcbmNvbnN0IHsgY29udGV4dEJyaWRnZSB9ID0gcmVxdWlyZSgnZWxlY3Ryb24nKVxuXG5cblxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnU3VjdXJzYWxlc0FQSScsIHtcbiAgZ2V0U3VjdXJzYWxlczogKCk9PmlwY1JlbmRlcmVyLmludm9rZSgnU3VjdXJzYWw6Z2V0X2xpc3QnKSxcbiAgZ2V0TGlzdFByZWNpb3M6IChpZCwgcmVnaXN0cmFkbz1mYWxzZSk9PmlwY1JlbmRlcmVyLmludm9rZSgnU3VjdXJzYWw6Z2V0X2xpc3RfcHJlY2lvcycsaWQscmVnaXN0cmFkbyksXG4gIHNhdmVMaXN0UHJlY2lvczogKGxpc3RfcHJlY2lvcyk9PmlwY1JlbmRlcmVyLmludm9rZSgnU3VjdXJzYWw6dXBkYXRlX2xpc3RfcHJlY2lvcycsbGlzdF9wcmVjaW9zKSxcbiAgc2F2ZVByZW5kYVByZWNpbzogKGRhdGFQcmVuZGEpID0+aXBjUmVuZGVyZXIuaW52b2tlKCdTdWN1cnNhbDpzYXZlX3ByZW5kYScsZGF0YVByZW5kYSksXG4gIGRlbGV0ZVByZW5kYTogKHByZW5kYV9pZCkgPT5pcGNSZW5kZXJlci5pbnZva2UoJ1N1Y3Vyc2FsOmRlbGV0ZV9wcmVuZGEnLHByZW5kYV9pZCksXG4gIHNhdmVOb3RhOiAoZGF0YU5vdGEpID0+aXBjUmVuZGVyZXIuaW52b2tlKCdOb3RhczpzYXZlX25vdGEnLGRhdGFOb3RhKSxcbiAgdXBkYXRlUHJlbmRhOiAoZGF0YVByZW5kYSkgPT5pcGNSZW5kZXJlci5pbnZva2UoJ1N1Y3Vyc2FsOnVwZGF0ZV9wcmVuZGEnLCBkYXRhUHJlbmRhKSxcbiAgZ2V0TGlzdE5vdGFzOiAoZmlsdHJvcykgPT5pcGNSZW5kZXJlci5pbnZva2UoJ05vdGFzOmdldF9saXN0X25vdGFzJyxmaWx0cm9zKSxcbiAgaW1wcmltaXJUaWNrZXQ6IChkYXRhTm90YXMsbm9tYnJlX2NsaWVudGUpID0+aXBjUmVuZGVyZXIuaW52b2tlKCdOb3RhczppbXByaW1pcl90aWNrZXQnLGRhdGFOb3Rhcyxub21icmVfY2xpZW50ZSksXG4gIGVsaW1pbmFyTm90YTogKGlkX25vdGEpID0+aXBjUmVuZGVyZXIuaW52b2tlKCdOb3RhczplbGltaW5hcl9ub3RhJyxpZF9ub3RhKSxcbn0pO1xuIl0sIm5hbWVzIjpbImlwY1JlbmRlcmVyIiwicmVxdWlyZSIsImNvbnRleHRCcmlkZ2UiLCJleHBvc2VJbk1haW5Xb3JsZCIsImdldFN1Y3Vyc2FsZXMiLCJpbnZva2UiLCJnZXRMaXN0UHJlY2lvcyIsImlkIiwicmVnaXN0cmFkbyIsInNhdmVMaXN0UHJlY2lvcyIsImxpc3RfcHJlY2lvcyIsInNhdmVQcmVuZGFQcmVjaW8iLCJkYXRhUHJlbmRhIiwiZGVsZXRlUHJlbmRhIiwicHJlbmRhX2lkIiwic2F2ZU5vdGEiLCJkYXRhTm90YSIsInVwZGF0ZVByZW5kYSIsImdldExpc3ROb3RhcyIsImZpbHRyb3MiLCJpbXByaW1pclRpY2tldCIsImRhdGFOb3RhcyIsIm5vbWJyZV9jbGllbnRlIiwiZWxpbWluYXJOb3RhIiwiaWRfbm90YSJdLCJzb3VyY2VSb290IjoiIn0=