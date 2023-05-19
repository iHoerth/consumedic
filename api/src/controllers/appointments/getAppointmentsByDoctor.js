const {Cita, PacienteType}= require("../../db")

const getAppointmentsByDoctor = async (idDoctor)=>{
    
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
    return appointments;
}
module.exports = { 
    getAppointmentsByDoctor
 };