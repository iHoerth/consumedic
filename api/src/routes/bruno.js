router.get("/obrasSociales", async ( req, res ) => { // Bruno
    try {
      const obras = await getobrassociales();
        return res.status(200).json();      
    } catch (error) {
        return res.status(404).send(error.message);
    }
  })

// aca adentro estara uyn arraya con todas las obras sociales
// o sino tendriamos que hcaer una petcion a una pagina para que nos den obras sociales
  const getobrassociales=()=>{
    return {doctor1,doctor2,doctor5,doctor4,doctor3}
  }

  
router.get("/doctors/:id", async ( req, res ) => { //brunio
    try {
      const {dni} = req.params;
      const doctorinfo = await getinfodoctor(dni);
        return res.status(200).json(doctorinfo);      
    } catch (error) {
        return res.status(404).send(error.message);
    }
  })

  const getinfodoctor = async (dni) => {
    const doctorinfo = await DoctorTypes.findOne({
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


router.post("/opinions", async ( req, res ) => { //bruno
    try {
        const {dni} = req.params;
        const doctorinfoopiniones = await getinfodoctor(dni);
        return res.status(200).json();      
    } catch (error) {
        return res.status(404).send(error.message);
    }
  })


  const getinfodoctoropiniones = async (dni) => {
    const doctorinfo = await DoctorTypes.findOne({
      where: { dni },
      include: [
        { model: opinions },
      ],
    });
  
    if (!doctorinfo) {
      throw new Error('No hya opiniones de este doctor. ');
    }
    const doctorObject = {};
    doctorObject.opinion = doctorinfo.opinions.map((opinion) => opinion.dataValues);

  
    return doctorObject;
  };
