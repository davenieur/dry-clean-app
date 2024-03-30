export const convierteFecha = (fecha) => {
    if(fecha){
        // Crear un objeto Date con la fecha proporcionada
        var fechaObjeto = new Date(fecha);

        // Obtener el día del mes (1-31)
        var dia = ("0" + fechaObjeto.getDate()).slice(-2); // Asegura que siempre tenga dos dígitos

        // Obtener el mes (0-11), sumar 1 para que sea de 1-12
        var mes = ("0" + (fechaObjeto.getMonth() + 1)).slice(-2); // Asegura que siempre tenga dos dígitos

        // Obtener el año de cuatro dígitos
        var anio = fechaObjeto.getFullYear();

        // Formatear la fecha en un formato más legible
        var fechaLegible = dia +  "/" + mes + "/" + anio;

        return fechaLegible;
    } else{
        return ''
    }
    
}
