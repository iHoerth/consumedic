const {DoctorType}= require("../../db")

const modifyDoctor = async (id,status) => {
    let doctor= await DoctorType.findByPk(id,{
        include: {all: true}
    });
    let doctorCompare = doctor.status;
    doctor.status=status;
    await doctor.save();
    if(doctorCompare===doctor.status){
        throw new Error('No se actualizó el status del doctor');
    }
    return doctor;
}

module.exports = { modifyDoctor };