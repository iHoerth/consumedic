const {PacienteType, ObraSocial}= require("../../db")

const createPatient = async (dni, email, password, telefono, nombre, apellido, idObraSocial) => {
    const newObraSocial = await ObraSocial.findByPk(idObraSocial);
    
    const newPatient = await PacienteType.create({
        dni, 
        email,
        password,
        telefono,
        nombre,
        apellido,
        ObraSocialId: newObraSocial.id
    })
    return newPatient
}

module.exports = { createPatient };