const {ObraSocial}= require("../../db")

const getAllSocialSecurities = async () => {
    const socialsecs = await ObraSocial.findAll({
        include: {all: true}
    });
    return socialsecs;
}

module.exports = { getAllSocialSecurities };