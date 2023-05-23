const {Cita, PacienteType}= require("../../db")

const getAppointmentsByDoctor = async (idDoctor)=>{
    if(!idDoctor) throw new Error("Falta ID del Doctor para obtener los turnos")
    else {
        let appointments = await Cita.findAll({
            where: { DoctorTypeId: idDoctor },
        })
        if(!appointments.length){
            throw new Error("No hay turnos registrados")
        }
        for(i=0; i<appointments.length;i++){
            const paciente = await PacienteType.findOne({ 
                where: { 
                    id: appointments[i].PacienteTypeId,
                },
                attributes: {exclude: ['password', "status", "isDoctor"]},
                
             })
             appointments[i].dataValues.paciente=paciente.dataValues;
        }
        appointments.sort((a,b)=>{
            const aFecha = a.fecha.split("-")
            const bFecha = b.fecha.split("-")
            const aHora = a.hora.split(":")
            const bHora = b.hora.split(":")
            if (bFecha[0] < aFecha[0]) return 1;
            if (bFecha[0] === aFecha[0] && bFecha[1] < aFecha[1]) return 1;
            if (bFecha[0] === aFecha[0] && bFecha[1] === aFecha[1] && bFecha[2] < aFecha[2]) return 1;
            if (bFecha[0] === aFecha[0] && bFecha[1] === aFecha[1] && bFecha[2] === aFecha[2]) {
            if (Number(bHora[0]) < Number(aHora[0])) return 1;
            if (Number(bHora[0]) === Number(aHora[0]) && Number(bHora[1]) <= Number(aHora[1])) {
                return 1;
            }
            }
            return -1;
        })

        // separo appointments pasados y por venir
        let viejosTurnos=[];
        let futurosTurnos=[];

        const today = new Date()
        let yy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        
        let hh= today.getHours()
        let min= today.getMinutes()

        for(let i=0; i<appointments.length;i++){
            const fecha = appointments[i].fecha.split("-");
            const hora = appointments[i].hora.split(":");
            if(Number(fecha[0])<yy) viejosTurnos.push(appointments[i])
            else if(Number(fecha[0])===yy&&Number(fecha[1])<mm) viejosTurnos.push(appointments[i])
            else if(Number(fecha[0])===yy&&Number(fecha[1])===mm&&Number(fecha[2])<dd) viejosTurnos.push(appointments[i])
            else if(Number(fecha[0])===yy&&Number(fecha[1])===mm&&Number(fecha[2])===dd){
                if(Number(hora[0])<hh) viejosTurnos.push(appointments[i])
                else if (Number(hora[0])===hh&&Number(hora[1])<min) viejosTurnos.push(appointments[i])
                else futurosTurnos.push(appointments[i])
            }
            else futurosTurnos.push(appointments[i])
        }

        appointments = {
            viejosTurnos,
            futurosTurnos
        }        
        return appointments
    }
}
module.exports = { 
    getAppointmentsByDoctor
 };