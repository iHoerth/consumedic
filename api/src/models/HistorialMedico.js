const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define("HistorialMedicoType",{
    id:{
       type:DataTypes.UUID,  // alfanumerico 
       defaultValue: DataTypes.UUIDV4, // este crea un numero aleatorio
       primaryKey: true,
       
    },
    descripcion:{
       type:DataTypes.STRING,
       allowNull:false,
       unique: true,
    },
    fecha:{
        type:DataTypes.DATEONLY,
        allowNull:false,
     },
    estudio:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    documentos:{
        type:DataTypes.STRING,
        allowNull:false,
     },
    },{
    timestamps:false // tercert algumento de difene, la fecha de creacion ñe
 } )
};