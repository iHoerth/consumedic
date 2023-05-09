const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define("PacienteType",{
    dni:{
       type:DataTypes.INTEGER,  // alfanumerico 
       defaultValue: DataTypes.UUIDV4, // este crea un numero aleatorio
       primaryKey: true,
       
    },
    email:{
       type:DataTypes.STRING,
       allowNull:false,
       unique: true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
     },
    telefono:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique: true,
     },
    nombre:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    apellido:{
       type:DataTypes.STRING,
       allowNull:false,
    },
     isDoctor : {
      type:  DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : false
     }
 },{
    timestamps:false // tercert algumento de difene, la fecha de creacion ñe
 } )
};