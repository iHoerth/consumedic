const getInfoPatient = async (dni) => {
  const patientInfo = await PacienteType.findOne({
    where: { dni },
    include: [
      { model: ObraSocials },
      { model: opinions },
      { model: especialidades },
    ],
  });

  if (!patientInfo) {
    throw new Error("no se encontro paciente");
  }

  const patientObject = {};
  patientObject.dni = patientInfo.dni;
  patientObject.email = patientInfo.email;
  patientObject.password = patientInfo.password;
  patientObject.telefono = patientInfo.telefono;
  patientObject.nombre = patientInfo.nombre;
  patientObject.apellido = patientInfo.apellido;

  return patientObject;
};

module.exports = { getInfoPatient };
