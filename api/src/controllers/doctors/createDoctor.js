const {DoctorType}= require("../../db")

const createDoctor = async (dni, NumMatricula, nombre, apellido, email, telefono, direccion, imagen, password, titulo, Descripcion) => {
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
    return newDoctor
}

module.exports = { createDoctor };