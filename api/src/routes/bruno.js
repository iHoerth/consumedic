


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
