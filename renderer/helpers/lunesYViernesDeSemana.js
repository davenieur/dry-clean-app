export function obtenerLunesYViernesDeSemana(fecha) {
    var diaSemana = fecha.getDay();
    var diferencia = diaSemana - 1; // Si es domingo, restará 1 para llegar al lunes
    if (diaSemana === 0) {
      // Si es domingo, establece la diferencia en 6 días para retroceder al lunes anterior
      diferencia = 6;
    }
    var lunes = new Date(fecha);
    lunes.setDate(fecha.getDate() - diferencia);
  
    var viernes = new Date(lunes);
    viernes.setDate(lunes.getDate() + 4);
  
    return {
      lunes: lunes,
      viernes: viernes
    };
  }