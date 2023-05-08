const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('ObraSocial', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true

    },
    nombre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    }
  },{
    timestamps: false
  });
};
