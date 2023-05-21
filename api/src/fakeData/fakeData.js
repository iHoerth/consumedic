const faker = require("faker");
const db = require("../db");

const createFakeData = async () => {
  //! Modificar Cantidad de Pacientes y Medicos de ser necesarios
  let docsAndPatients = 200;
  //! *******************

  // Crear Especialidades
  const especialidades = [
    "Especialista En Toxicología",
    "Óptico",
    "Farmacólogo",
    "Oncólogo Pediátrico",
    "Urólogo Pediátrico",
    "Psicomotricista",
    "Protetista - Ortesista",
    "Optometría",
    "Radioterapeuta",
    "Reumatólogo Pediátrico",
    "Neumonólogo Pediátrico",
    "Enfermero",
    "Dematólogo Pediátrico",
    "Gastroenterólogo Pediátrico",
    "Médico Naturista",
    "Especialista En Medicina Nuclear",
    "Quiropráctico",
    "Bioquímico",
    "Endocrinólogo Pediátrico",
    "Especialista En Terapia Intensiva",
    "Anestesista",
    "Podólogo",
    "Terapista Ocupacional",
    "Diabetólogo",
    "Mastólogo",
    "Cirujano de Cabeza y Cuello",
    "Médico Rehabilitador",
    "Médico Estético",
    "Cardiólogo Pediátrico",
    "Terapeuta Complementario",
    "Hepatólogo",
    "Genetista",
    "Médico Forense",
    "Cirujano Torácico",
    "Médico Laboral",
    "Flebólogo",
    "Cirujano Pediátrico",
    "Osteópata",
    "Geriatra",
    "Psicopedagogo",
    "Cirujano Digestivo",
    "Homeópata",
    "Sexólogo",
    "Cirujano Cardiovascular",
    "Médico Deportólogo",
    "Neurofisiólogo",
    "Cirujano Vascular",
    "Analista Clínico",
    "Patólogo",
    "Nefrólogo",
    "Radiólogo",
    "Infectólogo",
    "Oncólogo Pediátrico",
    "Cirujano Oral y Maxilofacial",
    "Obstetra",
    "Hematólogo",
    "Reumatólogo Pediátrico",
    "Médico General Y Familiar",
    "Neurocirujano",
    "Psicoanalista",
    "Cirujano Plástico",
    "Fonoaudiólogo",
    "Alergista",
    "Kinesiólogo",
    "Nutricionista",
    "Neumonólogo Pediátrico",
    "Neurólogo",
    "Urólogo Pediátrico",
    "Endocrinólogo Pediátrico",
    "Psiquiatra",
    "Cirujano General",
    "Pediatra",
    "Gastroenterólogo Pediátrico",
    "Otorrino",
    "Cardiólogo Pediátrico",
    "Oftalmólogo",
    "Dermatólogo",
    "Médico Clínico",
    "Psicólogo",
    "Traumatólogo",
    "Ginecólogo",
    "Odontólogo",
  ];
  for (let i = 0; i < especialidades.length; i++) {
    const especialidad = await db.Especialidad.create({
      name: especialidades[i],
    });
  }

  // Crear 10 ObraSocial
  const obrasSociales = [
    "ADOS ROSARIO",
    "AMPAR",
    "APDIS",
    "APDJIC",
    "APSOT",
    "ASE",
    "ASSPE",
    "CAMPSIC",
    "DITEM",
    "FAA",
    "FEDECAMARAS",
    "FRUTOS",
    "JOHNSON",
    "OPDEA",
    "OPZC",
    "OS.PE.PRI",
    "OSA",
    "OSADEF",
    "OSADRA",
    "OSALARA",
    "OSAMMVC",
    "OSAPM",
    "OSAPMCBA",
    "OSAPMER",
    "OSARPYH",
    "OSBA",
    "OSBARA",
    "OSCAMGLYP",
    "OSCAPBAQFLU",
    "OSCE",
    "OSCEP",
    "OSCHOCA",
    "OSCOEMA",
    "OSCOMM",
    "OSCONARA",
    "OSCRAIA",
    "OSDE",
    "OSDEL",
    "OSDEM",
    "OSDEPYM",
    "OSDIC",
    "OSDIPP",
    "OSDOP",
    "OSFYB",
    "OSFYHC",
    "OSIAD",
    "OSIM",
    "OSIPA",
    "OSITAC",
    "OSJERA",
    "OSJOMN",
    "OSJONR",
    "OSJPVYF",
    "OSLERA",
    "OSLPASTEUR",
    "OSLYF",
    "OSLYF PATAGONIA",
    "OSMA",
    "OSMAD",
    "OSMATA",
    "OSME",
    "OSMEDICA",
    "OSMISS",
    "OSMITA",
    "OSMMEDT",
    "OSOC",
    "OSOETSYLARA",
    "OSOFPP DE ROSARIO",
    "OSOSS",
    "OSPA",
    "OSPACA",
    "OSPACP",
    "OSPAD",
    "OSPADEP",
    "OSPAF",
    "OSPAGA",
    "OSPAIL",
    "OSPAÑA",
    "OSPAP",
    "OSPAT",
    "OSPATCA",
    "OSPAV",
    "OSPA-VIAL",
    "OSPCN",
    "OSPCRA",
    "OSPCSPMYA",
    "OSPCYD",
    "OSPDESBA",
    "OSPE",
    "OSPEA",
    "OSPEC",
    "OSPM",
    "OSPOCE",
    "OSTEP",
    "OSTES",
    "OSTIG",
    "OSTP",
    "OSTPBA",
    "OSTPCHPYARA",
    "OSTRAC",
    "OSTVENDRA",
    "OSTVLA",
    "OSUCI",
    "OSUOMRA",
    "OSUTI",
    "OSVARA",
    "OSYPF",
    "SERVESALUD",
  ];
  for (let i = 0; i < obrasSociales.length; i++) {
    const obraSocial = await db.ObraSocial.create({
      nombre: obrasSociales[i],
    });
  }

  const idEspecialidad = Math.ceil(Math.random() * 82);
  const newEspecialidad = await db.Especialidad.findByPk(idEspecialidad);
  const idOSocial = Math.ceil(Math.random() * 108);
  const newOs = await db.ObraSocial.findByPk(idOSocial);
  const doctor = await db.DoctorType.create({
    dni: faker.datatype.number(),
    NumMatricula: faker.datatype.number(),
    nombre: "Consumedic",
    apellido: "Doctor PF Henry",
    email: "consumedicgeneral@gmail.com",
    telefono: faker.datatype.number(),
    direccion: faker.address.streetAddress(),
    imagen: `${faker.image.people(null, null, true)}?random=${Date.now()}`,
    titulo: faker.music.genre(),
    Descripcion: faker.hacker.phrase(),
    rating: faker.datatype.number(),
    precio: Math.floor(Math.random() * 5000) + 5000,
    password: "$2b$10$YI1irth0iZQ8R/dpFHv1G.VmvEQ/asKTJSYxlTkhWwpFwMTRzt0ze",
    isDoctor: true,
    status: "active",
    EspecialidadId: newEspecialidad.dataValues.id,
  });
  doctor.addEspecialidads(newEspecialidad);
  doctor.addObraSocials(newOs);
  // Crear DoctorType
  for (let i = 0; i < docsAndPatients; i++) {
    const doctor = await db.DoctorType.create({
      dni: faker.datatype.number(),
      NumMatricula: faker.datatype.number(),
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      email: faker.internet.email(),
      telefono: faker.datatype.number(),
      direccion: faker.address.streetAddress(),
      imagen: `${faker.image.people(null, null, true)}?random=${Date.now()}`,
      password: faker.internet.password(),
      titulo: faker.music.genre(),
      Descripcion: faker.hacker.phrase(),
      rating: faker.datatype.number(),
      precio: Math.floor(Math.random() * 5000) + 5000,
      isDoctor: true,
      status: "active",
    });
    const idEspecialidad = Math.ceil(Math.random() * 82);
    const idObraSocial = Math.ceil(Math.random() * 108);
    const newEspecialidad = await db.Especialidad.findAll({
      where: { id: idEspecialidad },
    });
    const newObraSocial = await db.ObraSocial.findAll({
      where: { id: idObraSocial },
    });
    doctor.addEspecialidads(newEspecialidad);
    doctor.addObraSocials(newObraSocial);

    const newDoctor = await db.DoctorType.findByPk(i + 1);
    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const atiende = ["si", "no"];
    const horarioInAgenda = ["8:00:00", "9:00:00", "10:00:00", "11:00:00"];
    const horarioFinAgenda = ["15:00:00", "16:00:00", "17:00:00", "18:00:00"];

    for (let i = 0; i < daysOfWeek.length; i++) {
      const atiendeRandom = Math.floor(Math.random() * 2);
      const horarioRandomInAgenda = Math.floor(Math.random() * 4);
      const newHorario = await db.Horario.create({
        dia_semana: daysOfWeek[i],
        atiende: atiende[atiendeRandom],
        horario_inicio:
          atiende[atiendeRandom] === "si"
            ? horarioInAgenda[horarioRandomInAgenda]
            : null,
        horario_fin:
          atiende[atiendeRandom] === "si"
            ? horarioFinAgenda[horarioRandomInAgenda]
            : null,
        duracion_turno: atiende[atiendeRandom] === "si" ? "00:30:00" : null,
        DoctorTypeId: newDoctor.id,
      });
    }
  }

  //hashed password consumedic 1234 "$2b$10$YI1irth0iZQ8R/dpFHv1G.VmvEQ/asKTJSYxlTkhWwpFwMTRzt0ze",
  const idObraSocial = Math.ceil(Math.random() * 82);
  const newObraSocial = await db.ObraSocial.findByPk(idObraSocial);
  const paciente = await db.PacienteType.create({
    dni: faker.datatype.number(),
    email: "consumedicgeneral@gmail.com",
    password: "$2b$10$YI1irth0iZQ8R/dpFHv1G.VmvEQ/asKTJSYxlTkhWwpFwMTRzt0ze",
    telefono: faker.datatype.number(),
    nombre: "Consumedic",
    apellido: "Paciente PF Henry",
    isDoctor: false,
    status: "active",
    ObraSocialId: newObraSocial.dataValues.id,
  });
  const paciente2 = await db.PacienteType.create({
    dni: faker.datatype.number(),
    email: "pruebas@gmail.com",
    password: "$2b$10$YI1irth0iZQ8R/dpFHv1G.VmvEQ/asKTJSYxlTkhWwpFwMTRzt0ze",
    telefono: faker.datatype.number(),
    nombre: "Pruebas",
    apellido: "Paciente PF Henry",
    isDoctor: false,
    status: "active",
    ObraSocialId: newObraSocial.dataValues.id,
  });
  const paciente3 = await db.PacienteType.create({
    dni: faker.datatype.number(),
    email: "pruebasDoctor@gmail.com",
    password: "$2b$10$YI1irth0iZQ8R/dpFHv1G.VmvEQ/asKTJSYxlTkhWwpFwMTRzt0ze",
    telefono: faker.datatype.number(),
    nombre: "Pruebas",
    apellido: "Paciente PF Henry",
    isDoctor: true,
    status: "active",
    ObraSocialId: newObraSocial.dataValues.id,
  });
  // Crear PacienteType
  for (let i = 0; i < docsAndPatients; i++) {
    const idObraSocial = Math.ceil(Math.random() * 82);
    const newObraSocial = await db.ObraSocial.findByPk(idObraSocial);
    const paciente = await db.PacienteType.create({
      dni: faker.datatype.number(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      telefono: faker.datatype.number(),
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      isDoctor: false,
      status: "active",
      ObraSocialId: newObraSocial.dataValues.id,
    });
  }

  // Crear 10 Citas
  for (let i = 0; i < 900; i++) {
    function generarValorHorario() {
      var horas = Math.floor(Math.random() * 10) + 9; // generar una hora aleatoria entre las 9 y las 18
      var minutos = Math.random() < 0.5 ? "00" : "30"; // generar aleatoriamente "00" o "30" para los minutos
      var segundos = "00"; // fijar los segundos en "00"
      var valorHorario =
        horas.toString().padStart(2, "0") + ":" + minutos + ":" + segundos; // formatear el valor horario en una cadena con formato HH-MM-SS
      return valorHorario;
    }
    function generarFecha() {
      var fechaInicio = new Date(); // fecha de inicio a partir de hoy
      var fechaFin = new Date("2023-06-06"); // fecha de fin
      var diasSemana = [1, 2, 3, 4, 5]; // lunes a viernes
      var diaAleatorio =
        diasSemana[Math.floor(Math.random() * diasSemana.length)]; // elegir un día aleatorio de la semana
      fechaInicio.setDate(
        fechaInicio.getDate() + ((diaAleatorio - fechaInicio.getDay() + 7) % 7)
      ); // establecer la fecha de inicio en el próximo día aleatorio de la semana
      var fechaAleatoria = new Date(
        fechaInicio.getTime() +
          Math.random() * (fechaFin.getTime() - fechaInicio.getTime())
      ); // generar una fecha aleatoria entre la fecha de inicio y la fecha de fin
      var fecha = fechaAleatoria.toISOString().slice(0, 10); // formatear la fecha en una cadena con formato YYYY-MM-DD
      var diaSemana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ][fechaAleatoria.getDay()]; // obtener el día de la semana correspondiente a la fecha aleatoria
      return { fecha, diaSemana };
    }
    const fechas = generarFecha();
    const horas = generarValorHorario();
    const cita = await db.Cita.create({
      fecha: fechas.fecha,
      hora: horas,
      descripcion: faker.lorem.word(),
      status: "active",
      DoctorTypeId: Math.ceil(Math.random() * docsAndPatients),
      PacienteTypeId: Math.ceil(Math.random() * docsAndPatients),
    });
  }

  // Crear 10 HistorialMedico
  for (let i = 0; i < 10; i++) {
    const historialMedico = await db.HistorialMedico.create({
      descripcion: faker.lorem.paragraphs().substring(0, 150),
      fecha: faker.date.past(),
      estudio: faker.lorem.word(),
      documentos: faker.datatype.uuid(),
    });
  }

  // Crear 10 Opinion
  for (let i = 0; i < 10; i++) {
    const idMedico = Math.ceil(Math.random() * docsAndPatients);
    const idPaciente = Math.ceil(Math.random() * docsAndPatients);
    const newPacient = await db.PacienteType.findByPk(idPaciente);
    const newDoctor = await db.DoctorType.findByPk(idMedico);

    const opinion = await db.Opinion.create({
      ubicacion: faker.address.city(),
      puntaje: faker.datatype.number({ min: 1, max: 5 }),
      mensaje: faker.lorem.paragraphs().substring(0, 150),
      DoctorTypeId: newDoctor.dataValues.id,
      PacienteTypeId: newPacient.dataValues.id,
    });
  }

  // Crear 10 Pago
  for (let i = 0; i < 10; i++) {
    const pago = await db.Pago.create({
      precio: faker.datatype.number(),
      medioDeOPago: faker.finance.accountName(),
    });
  }
};

module.exports = {
  createFakeData,
};
