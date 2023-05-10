const {PacienteType}= require("../../db")

const createPatient = async (dni, email, password, telefono, nombre, apellido) => {
    const newPatient = await PacienteType.create({
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
    return newPatient
}

module.exports = { createPatient };