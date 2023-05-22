const {DoctorType}= require("../../db")

const getAllDoctors = async () => {
    const doctors = await DoctorType.findAll({
        where: { status: 'active'},
        include: {all: true}
    });
    if(!doctors.length) throw new Error("No se encuentran Doctores en la Base de Datos")
    else return doctors;
}

module.exports = { getAllDoctors };