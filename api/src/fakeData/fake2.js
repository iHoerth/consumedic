const faker = require("faker");
const db = require("../db");
const { createDoctor } = require("../controllers/doctors/createDoctor");
const { createPatient } = require("../controllers/patients/createPatient");
const bcrypt = require('bcrypt');

const dataFalsaDoctores = async () => {

    const cantDoctores = 100;
    const cantPacientes = 100;
    const especialidades = [
        "Especialista En Toxicología",
        "Óptico",
        "Farmacólogo",
        "Psicomotricista",
        "Protetista - Ortesista",
        "Optometría",
        "Radioterapeuta",
        "Enfermero",
        "Médico Naturista",
        "Especialista En Medicina Nuclear",
        "Quiropráctico",
        "Bioquímico",
        "Endocrinólogo Pediátrico",
        "Anestesista",
        "Podólogo",
        "Diabetólogo",
        "Mastólogo",
        "Cirujano de Cabeza y Cuello",
        "Médico Rehabilitador",
        "Médico Estético",
        "Terapeuta Complementario",
        "Hepatólogo",
        "Genetista",
        "Médico Forense",
        "Cirujano Torácico",
        "Médico Laboral",
        "Flebólogo",
        "Osteópata",
        "Geriatra",
        "Psicopedagogo",
        "Cirujano Cardiovascular",
        "Médico Deportólogo",
        "Analista Clínico",
        "Patólogo",
        "Nefrólogo",
        "Radiólogo",
        "Infectólogo",
        "Cirujano Oral y Maxilofacial",
        "Obstetra",
        "Hematólogo",
        "Neurocirujano",
        "Cirujano Plástico",
        "Kinesiólogo",
        "Nutricionista",
        "Neurólogo",
        "Psiquiatra",
        "Cirujano General",
        "Pediatra",
        "Otorrino",
        "Oftalmólogo",
        "Dermatólogo",
        "Médico Clínico",
        "Psicólogo",
        "Traumatólogo",
        "Ginecólogo",
        "Odontólogo",
      ];
      const obrasSociales = [
        // "ADOS ROSARIO",
        // "AMPAR",
        // "APDIS",
        // "APDJIC",
        // "APSOT",
        // "ASE",
        // "ASSPE",
        // "CAMPSIC",
        // "DITEM",
        // "FAA",
        // "FEDECAMARAS",
        // "FRUTOS",
        // "JOHNSON",
        // "OPDEA",
        // "OPZC",
        // "OS.PE.PRI",
        // "OSA",
        // "OSADEF",
        // "OSADRA",
        // "OSALARA",
        // "OSAMMVC",
        // "OSAPM",
        // "OSAPMCBA",
        // "OSAPMER",
        // "OSARPYH",
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
    
    //! Cuentas del proyecto
    //? Medico Consumedic
    for (let i=0; i<1;i++){
        const doctor = {
            dni: 9999999,
            NumMatricula: 4534,
            nombre: "Doctor",
            apellido: "PF Henry",
            email: "consumedicgeneral@gmail.com",
            telefono: "99999999",
            direccion: "Henry 2023",
            imagenCloudinary: `https://res.cloudinary.com/dnykabhqk/image/upload/v1685560208/Fotos%20Hombres/cec5bc7e-16dc-43ed-a931-5cc826675378_rwc_0x0x1916x1080x1916_qmt0gf.png`,
            titulo: "Desarrollador Web",
            Descripcion: "Cuenta maestra del Equipo del Proyecto",
            precio: 5000,
            hashedPassword: "$2b$10$YI1irth0iZQ8R/dpFHv1G.VmvEQ/asKTJSYxlTkhWwpFwMTRzt0ze",
            isDoctor: true,
            status: "active",
            idEspecialidad: Math.floor(Math.random() *especialidades.length),
            idObraSocial: Math.ceil(Math.random() * obrasSociales.length)
        };
        const {dni, NumMatricula, nombre, apellido, email, telefono, direccion, imagenCloudinary, hashedPassword, titulo, Descripcion, precio, idEspecialidad, idObraSocial} = doctor
        await createDoctor(dni, NumMatricula, nombre, apellido, email, telefono, direccion, imagenCloudinary, hashedPassword, titulo, Descripcion, precio, idEspecialidad, idObraSocial )
    }
    
    //? Paciente Consumedic
    for(let i=0; i<1;i++){
        const paciente ={
            dni: 9999999,
            email: "consumedicgeneral@gmail.com",
            hashedPassword: "$2b$10$YI1irth0iZQ8R/dpFHv1G.VmvEQ/asKTJSYxlTkhWwpFwMTRzt0ze",
            telefono: "99999999",
            nombre: "Paciente",
            apellido: "PF Henry",
            isDoctor: false,
            status: "deleted",
            admin: true,
            idObraSocial: Math.ceil(Math.random() * obrasSociales.length)
        };
        const {dni, email, hashedPassword, telefono, nombre, apellido, idObraSocial,status,admin}= paciente
        await createPatient(dni, email, hashedPassword, telefono, nombre, apellido, idObraSocial,status,admin)

    }


    //! doctores Random
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
            const hashedPassword = await bcrypt.hash(password, 10);
            const titulo = titulosMedicina[Math.floor(Math.random()*(titulosMedicina.length))];
            const Descripcion=descripciones[Math.floor(Math.random()*(descripciones.length))];
            const precio=Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000
            const idEspecialidad= Math.floor(Math.random() *especialidades.length);
            const idObraSocial= Math.ceil(Math.random() * obrasSociales.length);
            
            await createDoctor(dni, NumMatricula, nombre, apellido, email, telefono, direccion, imagenCloudinary, hashedPassword, titulo, Descripcion, precio, idEspecialidad, idObraSocial )
                
        } else {
            const dni = Math.floor(Math.random() * (35000000 - 15000000 + 1)) + 15000000;
            const NumMatricula = Math.floor(Math.random() * (45000 - 5000 + 1)) + 5000;
            const nombre=nombresHombres[Math.floor(Math.random()*(nombresHombres.length))];
            const apellido=apellidos[Math.floor(Math.random()*(apellidos.length))];
            const email=`${nombre}-${apellido}@${terminacionesMail[Math.floor(Math.random()*(terminacionesMail.length))]}`;
            const telefono = Math.floor(Math.random() * (4909000 - 4801000 + 1)) + 4801000;
            const direccion=direcciones[Math.floor(Math.random()*(direcciones.length))];
            const imagenCloudinary= fotosHombres[Math.floor(Math.random()*(fotosHombres.length))];
            const password= "12345678";
            const hashedPassword = await bcrypt.hash(password, 10);
            const titulo = titulosMedicina[Math.floor(Math.random()*(titulosMedicina.length))];
            const Descripcion=descripciones[Math.floor(Math.random()*(descripciones.length))];
            const precio=Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000
            const idEspecialidad= Math.floor(Math.random() *especialidades.length);
            const idObraSocial= Math.ceil(Math.random() * obrasSociales.length);
            
            await createDoctor(dni, NumMatricula, nombre, apellido, email, telefono, direccion, imagenCloudinary, hashedPassword, titulo, Descripcion, precio, idEspecialidad, idObraSocial )
        }
    }
    
    //! pacientes random
    for (let i = 0; i < cantPacientes; i++){    
        const dni= faker.datatype.number();
        const email= faker.internet.email();
        const password= faker.internet.password();
        const hashedPassword = await bcrypt.hash(password, 10);
        const telefono= faker.datatype.number();
        const nombre= faker.name.firstName();
        const apellido= faker.name.lastName();
        const status= "active";
        const idObraSocial= Math.ceil(Math.random() * obrasSociales.length);
       
        await createPatient(dni, email, hashedPassword, telefono, nombre, apellido, idObraSocial,status)       
    }

    //! citas random para los primeros 30 docs
    const docs=30
    for (let i = 0; i < docs*6; i++) {
        function generarValorHorario() {
          var horas = Math.floor(Math.random() * 3) + 9; // generar una hora aleatoria entre las 9 y las 12
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
          DoctorTypeId: Math.ceil(Math.random() * docs),
          PacienteTypeId: Math.ceil(Math.random() * docs),
        });
    }

    //! opiniones para los primeros 30 docs
    const opiniones = [
        "Excelente atención y trato amable por parte del personal médico.",
        "El doctor fue muy profesional y me explicó detalladamente mi diagnóstico.",
        "Me sentí cómodo durante la consulta y el tratamiento fue efectivo.",
        "El servicio en general fue rápido y eficiente, sin largas esperas.",
        "Recomendaría este centro médico a mis amigos y familiares sin dudarlo.",
        "Las instalaciones están limpias y bien equipadas, me transmitieron confianza.",
        "El personal administrativo fue amigable y me ayudaron con todas mis dudas.",
        "La enfermera fue muy gentil y cuidadosa al momento de aplicar el tratamiento.",
        "El médico escuchó atentamente mis síntomas y me dio un tratamiento adecuado.",
        "El servicio de atención al cliente fue excepcional, me sentí bien atendido.",
        "El costo de la consulta fue razonable en comparación con otros lugares.",
        "El ambiente en la sala de espera era tranquilo y confortable.",
        "El médico me proporcionó opciones de tratamiento y me explicó los pros y contras.",
        "Recibí resultados de mis análisis en poco tiempo, el laboratorio fue eficiente.",
        "Me sentí bien informado sobre los pasos a seguir después de la consulta.",
        "El personal de recepción fue amable y organizado, el proceso fue ágil.",
        "El centro médico cuenta con un amplio horario de atención, muy conveniente.",
        "La terapia que recibí me ayudó a mejorar mi condición notablemente.",
        "La atención médica fue integral, abordaron todos los aspectos de mi salud.",
        "La ubicación del centro médico es conveniente y de fácil acceso.",
      ]
    for (let i = 0; i < docs*2; i++) {
        const idMedico = Math.ceil(Math.random() * docs);
        const idPaciente = Math.ceil(Math.random() * docs);
        const newPacient = await db.PacienteType.findByPk(idPaciente);
        const newDoctor = await db.DoctorType.findByPk(idMedico);
        const coment = Math.floor(Math.random() *opiniones.length)
    
        const opinion = await db.Opinion.create({
          ubicacion: faker.address.city(),
          puntaje: faker.datatype.number({ min: 2, max: 5 }),
          mensaje: opiniones[coment],
          DoctorTypeId: newDoctor.dataValues.id,
          PacienteTypeId: newPacient.dataValues.id,

        });
      }


}
module.exports = {
    dataFalsaDoctores,
}
