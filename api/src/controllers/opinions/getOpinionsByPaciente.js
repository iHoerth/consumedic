const {Opinion, PacienteType, DoctorType}= require("../../db")

const getOpinionsByPaciente = async (id) => {
    const opinions = await Opinion.findAll({
        where: {PacienteTypeId: id}, 
        include: [
            {
                model: DoctorType,
                attributes: {
                    exclude: ["password"]
                }
            },
          ]
    });
    return opinions;
}

module.exports = { getOpinionsByPaciente };