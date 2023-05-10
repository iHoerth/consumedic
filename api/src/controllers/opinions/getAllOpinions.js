const {Opinion}= require("../../db")

const getAllOpinions = async () => {
    const opinions = await Opinion.findAll({
        include: {all: true}
    });
    return opinions;
}

module.exports = { getAllOpinions };