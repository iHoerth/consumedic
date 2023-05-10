const {DoctorType, Especialidad, ObraSocial}= require("../../db")

const createDoctor = async (dni, NumMatricula, nombre, apellido, email, telefono, direccion, imagen, password, titulo, Descripcion, idEspecialidad, idObraSocial) => {
    const newDoctor = await DoctorType.create({
        dni, 
        NumMatricula, 
        nombre, 
        apellido, 
        email, 
        telefono, 
        direccion, 
        imagen, 
        password, 
        titulo, 
        Descripcion
    })

    const newEspecialidad = await Especialidad.findAll({ where: { id: idEspecialidad } });
    const newObraSocial = await ObraSocial.findAll({ where: { id: idObraSocial } });

    newDoctor.addEspecialidads(newEspecialidad);
    newDoctor.addObraSocials(newObraSocial);

    return newDoctor
}

module.exports = { createDoctor };