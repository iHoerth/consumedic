const {Cita}= require("../../db")
const {getAppointmentsByDoctor} = require("./getAppointmentsByDoctor");
const {getHorariosById} = require("../horarios/getHorariosById")

const getDoctorCalendar = async (idDoctor)=>{
    const generarTurnos = async (idDoctor) => {
        let agenda = await getHorariosById(idDoctor);
    
        const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        let today = new Date()
        let dayOfWeek = daysOfWeek[today.getDay()];
        
        agenda = agenda.concat(agenda);
        const found = agenda.findIndex(dia=>dia.dia_semana===dayOfWeek)
        const agenda1 = agenda.slice(found)
        const agenda2 = agenda.slice(0,found)
        agenda = agenda1.concat(agenda2)
        
        let turnos = [];
        for(let i=0; i<agenda.length; i++){ // se muestran dos semanas de turnos
            let today = new Date();
            today.setDate(today.getDate() + i);
            let yy = today.getFullYear();
            let mm = today.getMonth() + 1;
            if(mm<10) mm=`0${mm}`
            let dd = today.getDate();
            let dayOfWeek = daysOfWeek[today.getDay()];
            if(agenda[i].atiende==="si")
            {
              let horaInicio = agenda[i].horario_inicio
              let horaFin= agenda[i].horario_fin
              let duracionTurno = agenda[i].duracion_turno
              horaInicio = new Date(`2023-05-11T${horaInicio}`);
              horaFin = new Date(`2023-05-11T${horaFin}`);
              duracionTurno = new Date(`1970-01-01T${duracionTurno}Z`);
        
              let horaActual = horaInicio;
              while (horaActual < horaFin) {
                let turno ={
                  fecha: `${yy}-${mm}-${dd}`,
                  dia_semana: dayOfWeek,
                  hora: horaActual.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}).replace(/:\d+ /, ':00 '),
                  estado: "libre"
                }
                turnos.push(turno)
                horaActual = new Date(horaActual.getTime() + duracionTurno.getTime());
              }
            }
            if(agenda[i].atiende==="no")
            {
              let turno ={
                fecha: `${yy}-${mm}-${dd}`,
                dia_semana: dayOfWeek,
                estado: "no atiende"
              }
              turnos.push(turno)
            }
          }
        return turnos
    }

    const traerTurnos = async (idDoctor) =>{
        const turnosReservados = await getAppointmentsByDoctor(idDoctor)
        return turnosReservados
    }

    const filtrarTurnos = (turno)=>{
        if(turno.estado !== "no atiende"){
          let horario = turno.hora.split(":")
          let dia = turno.fecha.split("-")
          
          if(dia[0]<diaHoy[0]) return false;
          if(dia[0]===diaHoy[0]&&dia[1]<diaHoy[1])return false
          if(dia[0]===diaHoy[0]&&dia[1]===diaHoy[1]&&dia[2]<diaHoy[2])return false
          if(dia[0]===diaHoy[0]&&dia[1]===diaHoy[1]&&dia[2]===diaHoy[2]){
            if(Number(horario[0])<Number(horaHoy[0])) return false;
            if(Number(horario[0])===Number(horaHoy[0])&&Number(horario[1])<=Number(horaHoy[1])){
                return false;
            }
          }
          return true;
        }
        if(turno.estado === "no atiende"){
          let dia = turno.fecha.split("-")
          
          if(dia[0]<diaHoy[0]) return false;
          if(dia[0]===diaHoy[0]&&dia[1]<diaHoy[1])return false
          if(dia[0]===diaHoy[0]&&dia[1]===diaHoy[1]&&dia[2]<diaHoy[2])return false
          
          return true;
        }
    }

    let turnosMedico = await generarTurnos(idDoctor); 
    let turnosOcupados = await traerTurnos(idDoctor);
    let horaHoy = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}).replace(/:\d+ /, ':00 ');
    let diaHoy = new Date().toLocaleDateString([], {year: 'numeric', month:'2-digit', day:'2-digit'})
    diaHoy = diaHoy.split("/").reverse()
    horaHoy = horaHoy.split(":")

    
    let turnosFiltrados = turnosMedico.filter(filtrarTurnos) //Filter turnos menores a la fecha actual

    // buscar turnos que ya estan agendados en Citas para cambiar a estado ocupado
    for (let i=0; i<turnosOcupados.length;i++){
        const found = turnosFiltrados.findIndex(turno=>turno.fecha===turnosOcupados[i].fecha && turno.hora===turnosOcupados[i].hora)
        if(found>=0) turnosFiltrados[found].estado="ocupado";
    }

    
    const timeTable = []
    
    let today = new Date();
    let dd = today.getDate();
    let yy = today.getFullYear();
    let mm = today.getMonth() + 1;
    if(mm<10) mm=`0${mm}`
    today = `${yy}-${mm}-${dd}`
    let manana = new Date(); 
    manana.setDate(manana.getDate() + 1);
    let dd2 = manana.getDate();
    let yy2 = manana.getFullYear();
    let mm2 = manana.getMonth() + 1;
    if(mm2<10) mm2=`0${mm2}`
    manana = `${yy2}-${mm2}-${dd2}`

    console.log(today, manana);

    for(let i = 0; i<turnosFiltrados.length;){
        let turnosDia = [];
        let dia = turnosFiltrados[i].dia_semana;
        let fecha = turnosFiltrados[i].fecha;
        let atiende = turnosFiltrados[i].estado === "libre" || turnosFiltrados[i].estado ==="ocupado" ? "si" : "no";
        if(atiende === "si"){
            while(i<turnosFiltrados.length && turnosFiltrados[i].dia_semana===dia){
              let newTurno ={
                hora: turnosFiltrados[i].hora,
                estado: turnosFiltrados[i].estado
              }
              turnosDia.push(newTurno)
              i++
            }
            if (fecha===today){
              dia = "Hoy"
            }
            if (fecha===manana){
              dia = "Mañana"
            }
            let newDay = {
              dia: dia,
              fecha: fecha,
              atiende: atiende,
              turnos: turnosDia
            }
            timeTable.push(newDay)
        } else {
            if (fecha===today){
                dia = "Hoy"
                }
            if (fecha===manana){
                dia = "Mañana"
                }  
          let newDay = {
              dia: dia,
              fecha: fecha,
              atiende: atiende,
          }
          timeTable.push(newDay)
          i++
        }
      }
      return timeTable;
}
module.exports = { 
    getDoctorCalendar
};