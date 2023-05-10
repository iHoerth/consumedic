const {DoctorType}= require("../../db")

const getAllDoctors = async () => {
    const doctors = await DoctorType.findAll({
        where: { status: 'active'},
        include: {all: true}
    });
    return doctors;
}

module.exports = { getAllDoctors };