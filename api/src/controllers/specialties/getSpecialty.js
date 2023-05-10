const {Especialidad}= require("../../db")

const getSpecialty = async (name) => {
    const specialty = await Especialidad.findAll({
        where: {
            name: name
        },
        include: {all: true}
    });
    if(!specialty.length){
        throw new Error(`No se encontró la especialidad con el nombre: ${name}`);
    }
    return specialty;
}

module.exports = { getSpecialty };