const {DoctorType, Especialidad, ObraSocial }= require("../../db")
const {getDoctor} = require("./getDoctor")

const modifyProfileDoctor = async (doctorNewDetails) => {
    const {id, Descripcion, apellido, direccion, dni, email, especialidades, imagen, nombre, obrasSociales, precio, telefono, titulo, oldEspecialidades, oldObrasSociales} = doctorNewDetails
    
    let doctor= await DoctorType.findByPk(id);
    
    doctor.set({
        Descripcion:  Descripcion,
        apellido:  apellido,
        direccion: direccion,
        dni: dni,
        email: email,
        imagen: imagen,
        nombre: nombre,
        precio: precio,
        telefono: telefono,
        titulo: titulo,
    })
    await doctor.save();
    
    if (Array.isArray(oldEspecialidades) && oldEspecialidades.length > 0) {
        for(let i =0; i<oldEspecialidades.length; i++){
            let especialidad = await Especialidad.findByPk(oldEspecialidades[i].id)
            doctor.removeEspecialidads(especialidad);
        }
        if (Array.isArray(especialidades) && especialidades.length > 0){
            for(let i=0; i<especialidades.length; i++){
                doctor.addEspecialidads(especialidades[i].id)
            }
        }
    }
    if (Array.isArray(oldObrasSociales) && oldObrasSociales.length > 0) {
        for(let i =0; i<oldObrasSociales.length; i++){
            let obraSocial = await ObraSocial.findByPk(oldObrasSociales[i].id)
            doctor.removeObraSocials(obraSocial);
        }
        if (Array.isArray(obrasSociales) && obrasSociales.length > 0){
            for(let i=0; i<obrasSociales.length; i++){
                doctor.addObraSocials(obrasSociales[i].id)
            }
        }
    }    
    doctor=getDoctor(doctor.email)

    return doctor;
}

module.exports = { modifyProfileDoctor };