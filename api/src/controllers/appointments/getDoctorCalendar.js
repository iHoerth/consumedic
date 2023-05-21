const { Cita } = require('../../db');
const { getAppointmentsByDoctor } = require('./getAppointmentsByDoctor');
const { getHorariosById } = require('../horarios/getHorariosById');

const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const getDoctorCalendar = async (idDoctor) => {
  const generarTurnos = async (idDoctor) => {
    let agenda = await getHorariosById(idDoctor);
    // console.log('9. ------- AGENDA ------- \n',agenda);

    let today = new Date();
    // console.log('12. --- TODAY ---     ', today);

    let dayOfWeek = daysOfWeek[today.getDay()];
    agenda = agenda.concat(agenda);

    const found = agenda.findIndex((dia) => dia.dia_semana === dayOfWeek);

    const agenda1 = agenda.slice(found);
    const agenda2 = agenda.slice(0, found);

    agenda = agenda1.concat(agenda2);
    // console.log(`23. ---- AGENDA ---- \n`,agenda)
    let turnos = [];
    for (let i = 0; i < agenda.length; i++) {
      // se muestran dos semanas de turnos
      let today = new Date();
      today.setDate(today.getDate() + i);
      let yy = today.getFullYear();
      let mm = today.getMonth() + 1;
      if (mm < 10) mm = `0${mm}`;
      let dd = today.getDate();
      let dayOfWeek = daysOfWeek[today.getDay()];
      // console.log('atiende: ', agenda[i].atiende);
      if (agenda[i].atiende === 'si') {
        let horaInicio = agenda[i].horario_inicio;
        // console.log('38 HORA INICIO ', horaInicio);
        const horaInicioHH = horaInicio.split(':')[0];
        if (horaInicioHH < 10) horaInicio = `0${horaInicio}`;

        let horaFin = agenda[i].horario_fin;
        // console.log('40 HORA FIN ', agenda[i].horario_fin);

        let duracionTurno = agenda[i].duracion_turno;
        // console.log('42 DURACION TURNO ', agenda[i].duracion_turno);

        horaInicio = new Date(`2023-05-11T${horaInicio}`);
        // console.log('45 NEW DATE HORA INICIO ', horaInicio);

        horaFin = new Date(`2023-05-11T${horaFin}`);
        // console.log('47 NEW DATE HORA FIN ', horaFin);

        duracionTurno = new Date(`1970-01-01T${duracionTurno}Z`);
        // console.log('50 DURACION TURNO TO DATE ', duracionTurno);

        let horaActual = horaInicio;
        // console.log('52 horaActual < horaFin ', horaActual < horaFin);

        while (horaActual < horaFin) {
          let turno = {
            fecha: `${yy}-${mm}-${dd}`,
            dia_semana: dayOfWeek,
            hora: horaActual
              .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
              .replace(/:\d+ /, ':00 '),
            estado: 'libre',
          };
          turnos.push(turno);
          horaActual = new Date(horaActual.getTime() + duracionTurno.getTime());
        }
      }
      if (agenda[i].atiende === 'no') {
        let turno = {
          fecha: `${yy}-${mm}-${dd}`,
          dia_semana: dayOfWeek,
          estado: 'no atiende',
        };
        turnos.push(turno);
      }
    }
    // console.log(turnos);
    return turnos;
  };

  //! hasta aca parece todo bien
  //! hasta aca parece todo bien
  //! hasta aca parece todo bien
  //! hasta aca parece todo bien

  console.log('71. TRAER TURNOS');
  const traerTurnos = async (idDoctor) => {
    const turnosReservados = await getAppointmentsByDoctor(idDoctor);
    // console.log('74. -- TURNOS RESERVADOS --\n', turnosReservados);
    return turnosReservados;
  };
  console.log('78. FILTRAR TURNOS');
  const filtrarTurnos = (turno) => {
    if (turno.estado !== 'no atiende') {
      let horario = turno.hora.split(':');
      console.log('101 HORARIO ', horario);
      let dia = turno.fecha.split('-');
      console.log('103 DIA ', dia);
      console.log('104 TURNO.FECHA ', turno.fecha);

      // console.log('106 MES VS MESHOY ', dia[1] < diaHoy[1]);
      console.log('106 DIA VS DIAHOY ', dia[2] < diaHoy[2]);
      if (dia[0] < diaHoy[0]) return false;
      if (dia[0] === diaHoy[0] && dia[1] < diaHoy[1]) return false;
      if (dia[0] === diaHoy[0] && dia[1] === diaHoy[1] && dia[2] < diaHoy[2]) return false;
      if (dia[0] === diaHoy[0] && dia[1] === diaHoy[1] && dia[2] === diaHoy[2]) {
        if (Number(horario[0]) < Number(horaHoy[0])) return false;
        if (Number(horario[0]) === Number(horaHoy[0]) && Number(horario[1]) <= Number(horaHoy[1])) {
          return false;
        }
      }
      return true;
    }
    if (turno.estado === 'no atiende') {
      let dia = turno.fecha.split('-');

      if (dia[0] < diaHoy[0]) return false;
      if (dia[0] === diaHoy[0] && dia[1] < diaHoy[1]) return false;
      if (dia[0] === diaHoy[0] && dia[1] === diaHoy[1] && dia[2] < diaHoy[2]) return false;

      return true;
    }
  };

  let turnosMedico = await generarTurnos(idDoctor);
  let turnosOcupados = await traerTurnos(idDoctor);
  // console.log('128 TURNOS OCUPADOS ', turnosOcupados);

  let horaHoy = new Date()
    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    .replace(/:\d+ /, ':00 ');
  horaHoy = horaHoy.split(':');

  let diaHoyDate = new Date();
  let diaHoy = [
    `${diaHoyDate.getFullYear()}`,
    diaHoyDate.getMonth() < 10 ? `0${diaHoyDate.getMonth() + 1}` : `${diaHoyDate.getMonth() + 1}`,
    `${diaHoyDate.getDate()}`,
  ];
  console.log('143 DIA HOY ', diaHoy);

  let turnosFiltrados = turnosMedico.filter(filtrarTurnos); //Filter turnos menores a la fecha actual

  // buscar turnos que ya estan agendados en Citas para cambiar a estado ocupado
  for (let i = 0; i < turnosOcupados.length; i++) {
    const found = turnosFiltrados.findIndex(
      (turno) => turno.fecha === turnosOcupados[i].fecha && turno.hora === turnosOcupados[i].hora
    );
    if (found >= 0) turnosFiltrados[found].estado = 'ocupado';
  }
  console.log('128 TIME TABLE');
  const timeTable = [];

  let today = new Date();
  let dd = today.getDate();
  let yy = today.getFullYear();
  let mm = today.getMonth() + 1;
  if (mm < 10) mm = `0${mm}`;
  today = `${yy}-${mm}-${dd}`;
  let manana = new Date();
  manana.setDate(manana.getDate() + 1);
  let dd2 = manana.getDate();
  let yy2 = manana.getFullYear();
  let mm2 = manana.getMonth() + 1;
  if (mm2 < 10) mm2 = `0${mm2}`;
  manana = `${yy2}-${mm2}-${dd2}`;

  // console.log('144. TODAY :', today, '\n MANANA: ', manana);

  console.log('147. ---- TURNOS FILTRADOS LENGTH ----\n', turnosFiltrados.length);
  for (let i = 0; i < turnosFiltrados.length; ) {
    let turnosDia = [];
    let dia = turnosFiltrados[i].dia_semana;
    let fecha = turnosFiltrados[i].fecha;
    let atiende =
      turnosFiltrados[i].estado === 'libre' || turnosFiltrados[i].estado === 'ocupado'
        ? 'si'
        : 'no';
    if (atiende === 'si') {
      while (i < turnosFiltrados.length && turnosFiltrados[i].dia_semana === dia) {
        let newTurno = {
          hora: turnosFiltrados[i].hora,
          estado: turnosFiltrados[i].estado,
        };
        turnosDia.push(newTurno);
        i++;
      }
      if (fecha === today) {
        dia = 'Hoy';
      }
      if (fecha === manana) {
        dia = 'Mañana';
      }
      let newDay = {
        dia: dia,
        fecha: fecha,
        atiende: atiende,
        turnos: turnosDia,
      };
      timeTable.push(newDay);
    } else {
      if (fecha === today) {
        dia = 'Hoy';
      }
      if (fecha === manana) {
        dia = 'Mañana';
      }
      let newDay = {
        dia: dia,
        fecha: fecha,
        atiende: atiende,
      };
      timeTable.push(newDay);
      i++;
    }
  }
  console.log('RETURN');
  return timeTable;
};
module.exports = {
  getDoctorCalendar,
};
