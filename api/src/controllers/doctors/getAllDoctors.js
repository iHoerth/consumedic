const { DoctorType } = require('../../db');
const { getDoctorCalendar } = require('../appointments/getDoctorCalendar');


const getAllDoctors = async () => {
  const doctors = await DoctorType.findAll({
    where: { status: 'active' },
    include: { all: true },
  });


    for(let i=0; i<doctors.length;i++){
      const calendar = await getDoctorCalendar(doctors[i].id)
      doctors[i].dataValues.calendar = calendar
    }

    // doctors.map(async (doctor) => {
    //   const calendar = await getDoctorCalendar(doctor.id);
    //   doctor.dataValues.calendar = calendar
    
    // })

    //   return doctor;
    // });
    console.log("id",doctors[0].dataValues.id)
    console.log("calendario", doctors[0].dataValues.calendar);
    return doctors;
  // const doctorPromises = doctors.map(async (doctor) => {
  //   const id = doctor.id;
  //   const [calendar, agenda] = await Promise.all([getDoctorCalendar(id), getHorariosById(id)]);

  //   doctor.dataValues.calendar = calendar;
  //   doctor.dataValues.agenda = agenda;

  //   return doctor;
  // });

  // const resolvedDoctors = await Promise.all(doctorPromises);
  // return resolvedDoctors;
};

module.exports = { getAllDoctors };