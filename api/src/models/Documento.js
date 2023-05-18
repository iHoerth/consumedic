const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Documento', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true

    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{
    timestamps: false
  });
};