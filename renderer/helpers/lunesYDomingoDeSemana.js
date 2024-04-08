export function obtenerLunesYDomingoDeSemana(fecha) {
  var diaSemana = fecha.getDay();
  var diferenciaInicio = 1 - diaSemana; // Retrocede al lunes de la semana actual
  var diferenciaFin = 0; // Inicialmente, el domingo es el mismo día que la fecha proporcionada
  
  if (diaSemana === 0) { // Si es domingo
    diferenciaInicio -= 7; // Retrocede al lunes de la semana anterior
    diferenciaFin = 0; // El domingo será el mismo día que la fecha proporcionada
  } else {
    diferenciaFin = 7 - diaSemana; // Avanza al domingo de la semana actual
  }
  
  var lunes = new Date(fecha);
  lunes.setDate(fecha.getDate() + diferenciaInicio);
  
  var domingo = new Date(fecha);
  domingo.setDate(fecha.getDate() + diferenciaFin);
  
  return {
    lunes: lunes,
    domingo: domingo
  };
}
