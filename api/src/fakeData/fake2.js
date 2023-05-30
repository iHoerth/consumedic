const faker = require("faker");
const db = require("../db");
const { createDoctor } = require("../controllers/doctors/createDoctor");

const dataFalsaDoctores = async () => {
    const cantDoctores = 100;
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
    const fotosMujeres = [
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482335/Fotos%20Mujeres/10-22_1603395416_uhyjkn.jpg",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482333/Fotos%20Mujeres/mi_medico_ajust_3_0_yhcqld.jpg",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482333/Fotos%20Mujeres/depositphotos_147498069-stock-photo-pretty-female-doctor_vlsmv8.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482333/Fotos%20Mujeres/depositphotos_83039758-stock-photo-pretty-female-doctor-with-stethoscope_lirvpf.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482333/Fotos%20Mujeres/depositphotos_200171296-stock-photo-pretty-female-doctor-shot-studio_dgip7k.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482333/Fotos%20Mujeres/depositphotos_22381643-stock-photo-african-medical-nurse_zuby5d.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482332/Fotos%20Mujeres/depositphotos_21177261-stock-photo-beautiful-female-middle-aged-doctor_erhe4g.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482333/Fotos%20Mujeres/depositphotos_21186783-stock-photo-medical-worker_xk6hgk.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482333/Fotos%20Mujeres/depositphotos_60575315-stock-photo-portrait-of-young-woman-doctor_urlojs.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482512/Fotos%20Mujeres/depositphotos_25306599-stock-photo-pretty-female-doctor-writing-prescription_uimhww.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482561/Fotos%20Mujeres/depositphotos_20191259-stock-photo-pretty-female-medical-worker-in_rleu7b.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482562/Fotos%20Mujeres/depositphotos_379333682-stock-photo-portrait-of-pretty-female-doctor_jpvtfy.webp"
    ]
    const fotosHombres = [
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482775/Fotos%20Hombres/depositphotos_42486521-stock-photo-smiling-happy-handsome-family-doctor_szb5yw.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482774/Fotos%20Hombres/depositphotos_83196752-stock-photo-confident-doctor-at-hospital-posing_kc2kjo.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482774/Fotos%20Hombres/depositphotos_55357493-stock-photo-young-doctor_fdvf6a.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482774/Fotos%20Hombres/depositphotos_39179963-stock-photo-male-doctor-with-laptop-at_j8bfy0.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482774/Fotos%20Hombres/depositphotos_12694888-stock-photo-portrait-of-doctor-in-white_zztbuh.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482774/Fotos%20Hombres/depositphotos_25265613-stock-photo-successful-physician_vrb9ng.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482774/Fotos%20Hombres/depositphotos_379252206-stock-photo-portrait-copy-space-cheerful-joyful_zmpqrh.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482774/Fotos%20Hombres/depositphotos_414214512-stock-photo-doctor-crossed-arms-looking-camera_afcizk.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482774/Fotos%20Hombres/depositphotos_14779771-stock-photo-portrait-of-confident-young-doctor_aeajom.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482773/Fotos%20Hombres/depositphotos_188891364-stock-photo-happy-adult-doctor-sitting-workplace_oaqwzx.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482773/Fotos%20Hombres/depositphotos_218006906-stock-photo-happy-male-doctor-medical-coat_ss5xw5.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482773/Fotos%20Hombres/depositphotos_132246354-stock-photo-young-male-doctor-with-tablet_dwue3o.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482773/Fotos%20Hombres/depositphotos_138445604-stock-photo-male-doctor-in-hospital_b7hikz.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482773/Fotos%20Hombres/depositphotos_175549982-stock-photo-doctor_qymvfb.webp",
        "https://res.cloudinary.com/dnykabhqk/image/upload/v1685482773/Fotos%20Hombres/depositphotos_118522306-stock-photo-handsome-doctor-portrait_xegyp5.webp"
    ]
    const nombresMujeres = [
        "María",
        "Ana",
        "Sofía",
        "Lucía",
        "Valentina",
        "Camila",
        "Emma",
        "Isabella",
        "Mía",
        "Valeria",
        "Sara",
        "Laura",
        "Julia",
        "Adriana",
        "Carolina",
        "Fernanda",
        "Daniela",
        "Natalia",
        "Luisa",
        "Lorena"
    ]
    const nombresHombres = [
        "Juan",
        "Carlos",
        "Miguel",
        "Pedro",
        "Alejandro",
        "Luis",
        "Andrés",
        "Javier",
        "Fernando",
        "José",
        "Ricardo",
        "Gabriel",
        "Manuel",
        "David",
        "Pablo",
        "Santiago",
        "Daniel",
        "Héctor",
        "Jorge",
        "Rafael"
    ]
    const apellidos = apellidos_españoles = [
        "García",
        "Fernández",
        "González",
        "Rodríguez",
        "López",
        "Martínez",
        "Sánchez",
        "Pérez",
        "Gómez",
        "Martín",
        "Jiménez",
        "Hernández",
        "Díaz",
        "Torres",
        "Ruiz",
        "Ramírez",
        "Romero",
        "Alonso",
        "Moreno",
        "Molina"
    ]
    var terminacionesMail = [
        "gmail.com",
        "hotmail.com",
        "yahoo.com",
        "outlook.com",
        "icloud.com",
        "live.com",
        "aol.com",
        "protonmail.com",
        "me.com",
        "msn.com",
        "zoho.com",
        "yandex.com",
        "gmx.com",
        "mail.com",
        "rocketmail.com",
        "inbox.com",
        "fastmail.com",
        "tutanota.com",
        "mail.ru",
        "cox.net"
      ];
    const direcciones = [
        "Calle Falsa 123",
        "Avenida de los Sueños 456",
        "Calle del Sol 789",
        "Avenida Principal 321",
        "Calle Hermosa 654",
        "Avenida Central 987",
        "Calle Florido 741",
        "Avenida Verde 852",
        "Calle Primavera 963",
        "Avenida del Parque 159",
        "Calle Tranquila 753",
        "Avenida Serena 468",
        "Calle Encantada 258",
        "Avenida Encina 147",
        "Calle del Río 369",
        "Avenida del Bosque 753",
        "Calle del Recuerdo 951",
        "Avenida Bella Vista 246",
        "Calle del Mar 357",
        "Avenida del Ocaso 468",
        "Calle del Jardín 579",
        "Avenida Azul 680",
        "Calle Esperanza 791",
        "Avenida Luminosa 802",
        "Calle Bonita 913",
        "Avenida Dorada 124",
        "Calle Solitaria 235",
        "Avenida Dorada 346",
        "Calle del Sueño 457",
        "Avenida Brillante 568",
        "Calle del Arcoíris 679"
    ];
    const titulosMedicina = [
        "Doctor en Medicina",
        "Licenciado en Medicina",
        "Especialista en Medicina Interna",
        "Máster en Investigación Médica",
        "Doctorado en Ciencias Médicas",
        "Especialista en Cirugía General",
        "Máster en Salud Pública",
        "Especialista en Ginecología y Obstetricia",
        "Máster en Cardiología",
        "Especialista en Pediatría",
        "Doctorado en Neurología",
        "Especialista en Dermatología",
        "Máster en Psiquiatría",
        "Especialista en Oftalmología",
        "Doctor en Oncología",
        "Máster en Medicina Deportiva",
        "Especialista en Anestesiología",
        "Doctorado en Genética Médica",
        "Especialista en Radiología",
        "Máster en Medicina Familiar"
      ];
      const descripciones = [
        "Médico comprometido con brindar atención integral y personalizada a cada paciente.",
        "Apasionado por la medicina y enfocado en la investigación de nuevas terapias y tratamientos.",
        "Dedicado a proporcionar cuidado médico de calidad, priorizando el bienestar y la comodidad del paciente.",
        "Especializado en diagnóstico temprano y tratamiento efectivo de enfermedades crónicas.",
        "Experto en medicina preventiva, promoviendo estilos de vida saludables y previniendo enfermedades.",
        "Comprometido con el desarrollo de planes de tratamiento individualizados, adaptados a las necesidades de cada paciente.",
        "Interesado en la medicina basada en evidencias y en mantenerse actualizado sobre los avances científicos.",
        "Habilidades en cirugía y procedimientos médicos avanzados para garantizar resultados óptimos.",
        "Capacidad para comunicarse de manera efectiva con pacientes y sus familias, proporcionando orientación y apoyo.",
        "Amplia experiencia en el manejo de situaciones de emergencia y en la toma de decisiones rápidas y acertadas.",
        "Compromiso con la educación y la formación continua, compartiendo conocimientos con colegas y estudiantes.",
        "Enfoque centrado en el paciente, brindando un trato humano, respetuoso y compasivo.",
        "Destrezas en el trabajo en equipo y colaboración multidisciplinaria para garantizar una atención integral.",
        "Capacidad para manejar situaciones de alta presión y tomar decisiones críticas en momentos cruciales.",
        "Conocimientos en tecnología médica de vanguardia para brindar diagnósticos precisos y tratamientos efectivos.",
        "Habilidad para establecer una relación de confianza con los pacientes, generando un entorno de cuidado empático.",
        "Comprometido con la mejora continua de la calidad de la atención médica y la seguridad del paciente.",
        "Interesado en la salud global y en el trabajo humanitario para ayudar a comunidades desfavorecidas.",
        "Excelente capacidad de comunicación y empatía para tratar a pacientes de diversas edades y trasfondos culturales.",
        "Visión holística de la salud, considerando los aspectos físicos, emocionales y sociales en el cuidado del paciente.",
        "Mentalidad abierta y flexible, dispuesto a aprender y adaptarse a los avances y cambios en el campo de la medicina."
      ];

    //! Especialidades
    for (let i = 0; i < especialidades.length; i++) {
    const especialidad = await db.Especialidad.create({
        name: especialidades[i],
    });
    }
    //! obrasSociales
    for (let i = 0; i < obrasSociales.length; i++) {
    const obraSocial = await db.ObraSocial.create({
        nombre: obrasSociales[i],
    });
    }
    
    for (let i=0; i<cantDoctores; i++)
    {   
        const HoM  =  Math.floor(Math.random() * 2) + 1;
        if(HoM===1){ // mujer
            const dni = Math.floor(Math.random() * (35000000 - 15000000 + 1)) + 15000000;
            const NumMatricula = Math.floor(Math.random() * (45000 - 5000 + 1)) + 5000;
            const nombre=nombresMujeres[Math.floor(Math.random()*(nombresMujeres.length))];
            const apellido=apellidos[Math.floor(Math.random()*(apellidos.length))];
            const email=`${nombre}-${apellido}@${terminacionesMail[Math.floor(Math.random()*(terminacionesMail.length))]}`
            const telefono = Math.floor(Math.random() * (4909000 - 4801000 + 1)) + 4801000;
            const direccion=direcciones[Math.floor(Math.random()*(direcciones.length))];
            const imagenCloudinary= fotosMujeres[Math.floor(Math.random()*(fotosMujeres.length))];
            const password= "12345678"
            const titulo = titulosMedicina[Math.floor(Math.random()*(titulosMedicina.length))];
            const Descripcion=descripciones[Math.floor(Math.random()*(descripciones.length))];
            const precio=Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000
            const idEspecialidad= Math.floor(Math.random() *especialidades.length);
            const idObraSocial= Math.ceil(Math.random() * obrasSociales.length);
            
            await createDoctor(dni, NumMatricula, nombre, apellido, email, telefono, direccion, imagenCloudinary, password, titulo, Descripcion, precio, idEspecialidad, idObraSocial )
                
        } else {
            const dni = Math.floor(Math.random() * (35000000 - 15000000 + 1)) + 15000000;
            const NumMatricula = Math.floor(Math.random() * (45000 - 5000 + 1)) + 5000;
            const nombre=nombresHombres[Math.floor(Math.random()*(nombresHombres.length))];
            const apellido=apellidos[Math.floor(Math.random()*(apellidos.length))];
            const email=`${nombre}-${apellido}@${terminacionesMail[Math.floor(Math.random()*(terminacionesMail.length))]}`;
            const telefono = Math.floor(Math.random() * (4909000 - 4801000 + 1)) + 4801000;
            const direccion=direcciones[Math.floor(Math.random()*(direcciones.length))];
            const imagenCloudinary= fotosHombres[Math.floor(Math.random()*(fotosHombres.length))];
            const password= "12345678"
            const titulo = titulosMedicina[Math.floor(Math.random()*(titulosMedicina.length))];
            const Descripcion=descripciones[Math.floor(Math.random()*(descripciones.length))];
            const precio=Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000
            const idEspecialidad= Math.floor(Math.random() *especialidades.length);
            const idObraSocial= Math.ceil(Math.random() * obrasSociales.length);
            
            await createDoctor(dni, NumMatricula, nombre, apellido, email, telefono, direccion, imagenCloudinary, password, titulo, Descripcion, precio, idEspecialidad, idObraSocial )
        }
    
    }
}
module.exports = {
    dataFalsaDoctores,
};
