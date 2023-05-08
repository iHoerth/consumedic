const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Cita', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true

    },
    fecha:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    descripcion:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  },{
    timestamps: false
  });
};
