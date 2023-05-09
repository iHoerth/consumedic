const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Pago', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    precio:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    medioDeOPago: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },{
    timestamps: false
  });
};
