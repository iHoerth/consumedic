const { DoctorType } = require('../db'); 

async function getAllDoctors(req, res) {
  try {
    const doctors = await DoctorType.findAll();
    return res.status(200).send(doctors);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener los Doctores' });
  }
}

async function getDoctorsById(req, res){
  try {
    const {dni} = req.params;
    const doctorinfo = await getinfodoctor(dni);
    return res.status(200).json(doctorinfo);
  } catch (error) {
    return res.status(404).send(error.message);
  }
}

const getinfodoctor = async (dni) => {
  const doctorinfo = await DoctorType.findOne({
    where: { dni },
    include: [
      { model: ObraSocials },
      { model: opinions },
      { model: especialidades },
    ],
  });

  if (!doctorinfo) {
    throw new Error('No se encontró el doctor ');
  }

  const doctorObject = {};
  doctorObject.dni = doctorinfo.dni;
  doctorObject.NumMatricula = doctorinfo.NumMatricula;
  doctorObject.nombre = doctorinfo.nombre;
  doctorObject.apellido = doctorinfo.apellido;
  doctorObject.email = doctorinfo.email;
  doctorObject.telefono = doctorinfo.telefono;
  doctorObject.direccion = doctorinfo.direccion;
  doctorObject.imagen = doctorinfo.imagen;
  doctorObject.password = doctorinfo.password;
  doctorObject.titulo = doctorinfo.titulo;
  doctorObject.Descripcion = doctorinfo.Descripcion;
  doctorObject.especialidad = doctorinfo.especialidad.dataValues;
  doctorObject.opinion = doctorinfo.opinions.map((opinion) => opinion.dataValues);
  doctorObject.obraSocial = doctorinfo.obra_socials.map((obra_social) =>
    obra_social.dataValues
  );
  

  return doctorObject;
};


module.exports = {
  getAllDoctors,
  getDoctorsById
};