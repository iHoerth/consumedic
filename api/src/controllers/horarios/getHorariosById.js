const {Horario}= require("../../db")

const getHorariosById = async (idMedico)=>{
    const agenda = await Horario.findAll({
        where: { DoctorTypeId: idMedico }
    });
    return agenda;
}
module.exports = { getHorariosById };