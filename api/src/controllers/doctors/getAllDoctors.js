const { DoctorType } = require('../../db');
const { getDoctorCalendar } = require('../appointments/getDoctorCalendar');
const { getHorariosById } = require('../horarios/getHorariosById');

const getAllDoctors = async () => {
  const doctors = await DoctorType.findAll({
    where: { status: 'active' },
    include: { all: true },
  });
  
  return doctors;
  //   doctors.map(async (doctor) => {
  //     const calendar = await getDoctorCalendar(id);
  //     doctor.dataValues.calendar = calendar;

  //     const agenda = await getHorariosById(id);
  //     doctor.dataValues.agenda = agenda;

  //     return doctor;
  //   });

  //   return doctors;
  const doctorPromises = doctors.map(async (doctor) => {
    const id = doctor.id;
    const [calendar, agenda] = await Promise.all([getDoctorCalendar(id), getHorariosById(id)]);

    doctor.dataValues.calendar = calendar;
    doctor.dataValues.agenda = agenda;

    return doctor;
  });

  const resolvedDoctors = await Promise.all(doctorPromises);
  return resolvedDoctors;
};

module.exports = { getAllDoctors };
