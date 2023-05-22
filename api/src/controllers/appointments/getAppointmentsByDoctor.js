const {Cita, PacienteType}= require("../../db")

const getAppointmentsByDoctor = async (idDoctor)=>{
    if(!idDoctor) throw new Error("Falta ID del Doctor para obtener los turnos")
    else {
        const appointments = await Cita.findAll({
            where: { DoctorTypeId: idDoctor },
        })
        for(i=0; i<appointments.length;i++){
            const paciente = await PacienteType.findOne({ 
                where: { 
                    id: appointments[i].PacienteTypeId,
                },
                attributes: {exclude: ['password', "status", "isDoctor"]},
                
             })
             appointments[i].dataValues.paciente=paciente.dataValues;
        }
        if(appointments.length){
            return appointments;
        }
        else{
            throw new Error("No hay turnos registrados")
        }
    }
}
module.exports = { 
    getAppointmentsByDoctor
 };