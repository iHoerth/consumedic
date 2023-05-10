const {PacienteType}= require("../../db")

const getAllPatients = async () => {
    const pacients = await PacienteType.findAll({
        where: { status: 'active'},
        include: {all: true}
    });
    return pacients;
}

module.exports = { getAllPatients };