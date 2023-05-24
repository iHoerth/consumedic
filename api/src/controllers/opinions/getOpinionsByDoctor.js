const {Opinion, PacienteType}= require("../../db")

const getOpinionsByDoctor = async (id) => {
    const opinions = await Opinion.findAll({
        where: {DoctorTypeId: id}, 
        include: [
            {
                model: PacienteType,
                attributes: {
                    exclude: ["password"]
                }
            },
          ]
    });
    return opinions;
}

module.exports = { getOpinionsByDoctor };