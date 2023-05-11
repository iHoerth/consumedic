const {HistorialMedico}= require("../../db")

const getAllClinicsHistories = async () => {
    const clinicHistories = await HistorialMedico.findAll({
        include: {all: true}
    });
    return clinicHistories;
}

module.exports = { 
    getAllClinicsHistories
};