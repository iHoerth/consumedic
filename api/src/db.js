require("dotenv").config();
// const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT } = process.env;
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

// REQUIRE MODELS "const characterModel = require('./models/Character')"

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
//   { logging: false, native: false }
// );
const sequelize = new Sequelize(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// models "characterModel(sequelize);"

// Definir los modelos y sus realaciones

const {
  Cita,
  DoctorType,
  Especialidad,
  HistorialMedico,
  ObraSocial,
  Opinion,
  PacienteType,
  Pago,
  Horario,
  Documento
} = sequelize.models;

// 1:1
// Organization.belongsTo(User, { foreignKey: 'owner_id' });
// User.hasOne(Organization, { foreignKey: 'owner_id' });

// 1:M
// Project.hasMany(Task, { foreignKey: 'tasks_pk' });
// Task.belongsTo(Project, { foreignKey: 'tasks_pk' });

// N:M
// User.belongsToMany(Role, { through: 'user_has_roles', foreignKey: 'user_role_user_id' });
// Role.belongsToMany(User, { through: 'user_has_roles', foreignKey: 'roles_identifier' });

DoctorType.hasMany(Cita);
Cita.belongsTo(DoctorType);

DoctorType.belongsToMany(ObraSocial, { through: "doctor_obraSocials" });
ObraSocial.belongsToMany(DoctorType, { through: "doctor_obraSocials" });

DoctorType.belongsToMany(Especialidad, { through: "doctor_especialidades" });
Especialidad.belongsToMany(DoctorType, { through: "doctor_especialidades" });

DoctorType.hasMany(Opinion);
Opinion.belongsTo(DoctorType);

PacienteType.hasMany(Opinion);
Opinion.belongsTo(PacienteType);

Pago.belongsTo(Cita);
Cita.hasOne(Pago);

HistorialMedico.hasMany(Cita);
Cita.belongsTo(HistorialMedico);

PacienteType.hasMany(Cita);
Cita.belongsTo(PacienteType);

ObraSocial.hasMany(PacienteType); // a verificar si puede ser muchos a muchos
PacienteType.belongsTo(ObraSocial);

PacienteType.belongsTo(HistorialMedico);
HistorialMedico.hasOne(PacienteType);

Horario.belongsTo(DoctorType);
DoctorType.hasOne(Horario);

DoctorType.hasMany(Documento); 
Documento.belongsTo(DoctorType);

PacienteType.hasMany(Documento); 
Documento.belongsTo(PacienteType);

Cita.hasMany(Documento); 
Documento.belongsTo(Cita);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  sequelize,
};
