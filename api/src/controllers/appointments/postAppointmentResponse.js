const {Cita}= require("../../db")

const postAppointmentResponse = async (idCita,respuesta) => {

    let cita= await Cita.findByPk(idCita,{
        include: {all: true}
    });
    cita.respuestaMedico=respuesta;
    await cita.save();

    if(!cita) throw new Error("No se pudo agregar el comentario")
    else return cita;
}

module.exports = { postAppointmentResponse };