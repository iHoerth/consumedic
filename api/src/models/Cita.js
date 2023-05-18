const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Cita', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true

    },
    fecha:{
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora:{
      type: DataTypes.TIME,
      allowNull: false,
    },
    descripcion:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    respuestaMedico:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  },{
    timestamps: false
  });
};
