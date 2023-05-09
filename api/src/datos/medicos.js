const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

// Código para la configuración de Sequelize y la definición del modelo

const sequelize = new Sequelize(/* Configuración de la base de datos */);

const Doctor = require('./models/DoctorType')(sequelize);

// Generar un array de 10 doctores genéricos
const generateGenericDoctors = async () => {
  try {
    const genericDoctors = [];

    for (let i = 1; i <= 10; i++) {
      const doctor = await Doctor.create({
        dni: 123456789,
        NumMatricula: i,
        nombre: `Doctor ${i}`,
        apellido: `Apellido ${i}`,
        email: `doctor${i}@example.com`,
        telefono: 123456789,
        direccion: 'Dirección genérica',
        imagen: 'imagen.jpg',
        password: 'contraseña',
        titulo: 'Título genérico',
        Descripcion: 'Descripción genérica',
        especialidad: 'Especialidad genérica',
        obraSocial: 'Obra Social genérica'
      });

      genericDoctors.push(doctor);
    }

    console.log('Array de doctores genéricos creado:', genericDoctors);
  } catch (error) {
    console.error('Error al generar doctores genéricos:', error);
  }
};

generateGenericDoctors();