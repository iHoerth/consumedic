const {Opinion}= require("../../db")

const getOpinionsByDoctor = async (id) => {
    const opinions = await Opinion.findAll({
        where: {id},
        include: {all: true}
    });
    return opinions;
}

module.exports = { getOpinionsByDoctor };