const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "PacienteType",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      dni: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        // unique: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDoctor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["active", "deleted", "incomplete"],
        defaultValue: "active",
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      paranoid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }
  );
};
