const {Cita,DoctorType,PacienteType}= require("../../db")

const createAppointment = async (fecha, hora, descripcion, idDoctor, idPatient)=>{
    if(!fecha || !hora || !descripcion || !idDoctor || !idPatient) throw new Error("Faltan datos para crear la cita")
    else {
        const newPacient = await PacienteType.findByPk(idPatient);
        if(!newPacient) throw new Error("No se encontró paciente con ese ID")
        const newDoctor = await DoctorType.findByPk(idDoctor);
        if(!newDoctor) throw new Error("No se encontró Doctor con ese ID")
        const NewCita = await Cita.create({
            fecha,
            hora,
            descripcion,
            DoctorTypeId:newDoctor.id,
            PacienteTypeId:newPacient.id
        })

        if(!NewCita) throw new Error("No se pudo agendar la cita")
        else return NewCita;
    }
}
module.exports = { 
    createAppointment
 };