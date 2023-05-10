const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Opinion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      ubicacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      puntaje: {
        type: DataTypes.FLOAT,
      },
      mensaje: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
