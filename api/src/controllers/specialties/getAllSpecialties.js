const {Especialidad}= require("../../db")

const getAllSpecialties = async () => {
    const specialties = await Especialidad.findAll({
        include: {all: true}
    });
    return specialties;
}

module.exports = { getAllSpecialties };