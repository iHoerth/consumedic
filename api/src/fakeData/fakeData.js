const faker = require('faker');
const db = require('../db'); 

const createFakeData = async () => {

  // Crear 30 DoctorType
  for(let i = 0; i < 30; i++) {
    const doctor = await db.DoctorType.create({
      dni:faker.datatype.number(),
      NumMatricula: faker.datatype.number(),
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      email: faker.internet.email(),
      telefono: faker.datatype.number(),
      direccion: faker.address.streetAddress(),
      imagen:faker.image.cats(),
      password: faker.internet.password(),
      titulo:faker.music.genre(),
      Descripcion: faker.hacker.phrase(),
      rating: faker.datatype.number(),
      isDoctor: true,
      status: 'active'
    });
  }

  // Crear 30 PacienteType
  for(let i = 0; i < 30; i++) {
    const paciente = await db.PacienteType.create({
      dni: faker.datatype.number(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      telefono: faker.datatype.number(),
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      isDoctor: false,
      status: 'active'
    });
  }

  // Crear 30 Citas
  for(let i = 0; i < 30; i++) {
    const cita = await db.Cita.create({
      fecha: faker.date.future(),
      hora: faker.date.future(),
      descripcion: faker.lorem.word(),
      status: 'active'
    });
  }

  // Crear Especialidades
  const especialidades = [  "Especialista En Toxicología",  "Óptico",  "Farmacólogo",  "Oncólogo Pediátrico",  "Urólogo Pediátrico",  "Psicomotricista",  "Protetista - Ortesista",  "Optometría",  "Radioterapeuta",  "Reumatólogo Pediátrico",  "Neumonólogo Pediátrico",  "Enfermero",  "Dematólogo Pediátrico",  "Gastroenterólogo Pediátrico",  "Médico Naturista",  "Especialista En Medicina Nuclear",  "Quiropráctico",  "Bioquímico",  "Endocrinólogo Pediátrico",  "Especialista En Terapia Intensiva",  "Anestesista",  "Podólogo",  "Terapista Ocupacional",  "Diabetólogo",  "Mastólogo",  "Cirujano de Cabeza y Cuello",  "Médico Rehabilitador",  "Médico Estético",  "Cardiólogo Pediátrico",  "Terapeuta Complementario",  "Hepatólogo",  "Genetista",  "Médico Forense",  "Cirujano Torácico",  "Médico Laboral",  "Flebólogo",  "Cirujano Pediátrico",  "Osteópata",  "Geriatra",  "Psicopedagogo",  "Cirujano Digestivo",  "Homeópata",  "Sexólogo",  "Cirujano Cardiovascular",  "Médico Deportólogo",  "Neurofisiólogo",  "Cirujano Vascular",  "Analista Clínico",  "Patólogo",  "Nefrólogo",  "Radiólogo",  "Infectólogo",  "Oncólogo Pediátrico",  "Cirujano Oral y Maxilofacial",  "Obstetra",  "Hematólogo",  "Reumatólogo Pediátrico",  "Médico General Y Familiar",  "Neurocirujano",  "Psicoanalista",  "Cirujano Plástico",  "Fonoaudiólogo",  "Alergista",  "Kinesiólogo",  "Nutricionista",  "Neumonólogo Pediátrico",  "Neurólogo",  "Urólogo Pediátrico",  "Endocrinólogo Pediátrico",  "Psiquiatra",  "Cirujano General",  "Pediatra",  "Gastroenterólogo Pediátrico",  "Otorrino",  "Cardiólogo Pediátrico",  "Oftalmólogo",  "Dermatólogo",  "Médico Clínico",  "Psicólogo",  "Traumatólogo",  "Ginecólogo",  "Odontólogo"]
  for(let i = 0; i < especialidades.length; i++) {
    const especialidad = await db.Especialidad.create({
      name: especialidades[i]
    });
  }

  // Crear 30 HistorialMedico
  for(let i = 0; i < 30; i++) {
    const historialMedico = await db.HistorialMedico.create({
      descripcion: faker.lorem.paragraphs().substring(0, 150),
      fecha: faker.date.past(),
      estudio: faker.lorem.word(),
      documentos: faker.datatype.uuid()
    });
  }

  // Crear 30 Opinion
  for(let i = 0; i < 30; i++) {
    const opinion = await db.Opinion.create({
      fecha: faker.date.past(),
      ubicacion: faker.address.city(),
      puntaje: faker.datatype.number(),
      mensaje: faker.lorem.paragraphs().substring(0, 150)
    });
  }

  // Crear 30 ObraSocial
  const obrasSociales = [  "ADOS ROSARIO",  "AMPAR",  "APDIS",  "APDJIC",  "APSOT",  "ASE",  "ASSPE",  "CAMPSIC",  "DITEM",  "FAA",  "FEDECAMARAS",  "FRUTOS",  "JOHNSON",  "OPDEA",  "OPZC",  "OS.PE.PRI",  "OSA",  "OSADEF",  "OSADRA",  "OSALARA",  "OSAMMVC",  "OSAPM",  "OSAPMCBA",  "OSAPMER",  "OSARPYH",  "OSBA",  "OSBARA",  "OSCAMGLYP",  "OSCAPBAQFLU",  "OSCE",  "OSCEP",  "OSCHOCA",  "OSCOEMA",  "OSCOMM",  "OSCONARA",  "OSCRAIA",  "OSDE",  "OSDEL",  "OSDEM",  "OSDEPYM",  "OSDIC",  "OSDIPP",  "OSDOP",  "OSFYB",  "OSFYHC",  "OSIAD",  "OSIM",  "OSIPA",  "OSITAC",  "OSJERA",  "OSJOMN",  "OSJONR",  "OSJPVYF",  "OSLERA",  "OSLPASTEUR",  "OSLYF",  "OSLYF PATAGONIA",  "OSMA",  "OSMAD",  "OSMATA",  "OSME",  "OSMEDICA",  "OSMISS",  "OSMITA",  "OSMMEDT",  "OSOC",  "OSOETSYLARA",  "OSOFPP DE ROSARIO",  "OSOSS",  "OSPA",  "OSPACA",  "OSPACP",  "OSPAD",  "OSPADEP",  "OSPAF",  "OSPAGA",  "OSPAIL",  "OSPAÑA",  "OSPAP",  "OSPAT",  "OSPATCA",  "OSPAV",  "OSPA-VIAL",  "OSPCN",  "OSPCRA",  "OSPCSPMYA",  "OSPCYD",  "OSPDESBA",  "OSPE",  "OSPEA",  "OSPEC",  "OSPM",  "OSPOCE",  "OSTEP",  "OSTES",  "OSTIG",  "OSTP",  "OSTPBA",  "OSTPCHPYARA",  "OSTRAC",  "OSTVENDRA",  "OSTVLA",  "OSUCI",  "OSUOMRA",  "OSUTI",  "OSVARA",  "OSYPF",  "SERVESALUD"];
  for(let i = 0; i < obrasSociales.length; i++) {
    const obraSocial = await db.ObraSocial.create({
      nombre: obrasSociales[i]
    });
  }

  // Crear 30 Pago
  for(let i = 0; i < 30; i++) {
    const pago = await db.Pago.create({
      precio: faker.datatype.number(),
      medioDeOPago: faker.finance.accountName()
    });
  }
  
}

module.exports = {
    createFakeData,
}
