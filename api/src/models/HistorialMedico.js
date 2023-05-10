const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {


  sequelize.define("HistorialMedico",{
    id:{
       type:DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true,
       
    },
    descripcion:{
       type:DataTypes.STRING,
       allowNull:false,
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
    timestamps:false
 } )
};