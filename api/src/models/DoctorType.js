const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define("DoctorType",{
    dni:{
        type:DataTypes.INTEGER, 
        allowNull:false,
        
    },
    
    NumMatricula:{
        type:DataTypes.INTEGER  ,
         allowNull:false,
    },

    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    apellido:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true,
    },
    
    telefono:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique: true,
     },
     direccion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: false
      },
      //preguntar si esta bien model pass
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     especialidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      opinion: {
        type:DataTypes.STRING,  
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
     obraSocial: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
 },{
    timestamps:false // tercert algumento de difene, la fecha de creacion ñe
 } )
};