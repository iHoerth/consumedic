const {Cita}= require("../../db")

const postAppointmentResponse = async (idCita,respuesta) => {
    let cita= await Cita.findByPk(idCita,{
        include: {all: true}
    });
    cita.respuestaMedico=respuesta;
    await cita.save();

    return cita;
}

module.exports = { postAppointmentResponse };