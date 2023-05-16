const {Cita,DoctorType,PacienteType}= require("../../db")

const createAppointment = async (fecha, hora, descripcion, idDoctor, idPatient)=>{
    const newPacient = await PacienteType.findByPk(idPatient);
    const newDoctor = await DoctorType.findByPk(idDoctor);
    const NewCita = await Cita.create({
        fecha,
        hora,
        descripcion,
        DoctorTypeId:newDoctor.id,
        PacienteTypeId:newPacient.id
    })
    return NewCita;
}
module.exports = { 
    createAppointment
 };