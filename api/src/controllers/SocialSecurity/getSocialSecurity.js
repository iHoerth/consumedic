const {ObraSocial}= require("../../db")

const getSocialSecurity = async (name) => {
    const socialSec = await ObraSocial.findAll({
        where: {
            nombre: name
        },
        include: {all: true}
    });
    if(!socialSec.length){
        throw new Error(`No se encontró la obra social con el nombre: ${name}`);
    }
    return socialSec;
}

module.exports = { getSocialSecurity };