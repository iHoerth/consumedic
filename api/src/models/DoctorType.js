const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize) => {
  sequelize.define(
    "DoctorType",
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
      NumMatricula: {
        type: DataTypes.INTEGER,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      telefono: {
        type: DataTypes.STRING,
      },
      direccion: {
        type: DataTypes.STRING,
      },
      imagen: {
        type: DataTypes.STRING,
        // public_id: {
        //   type: DataTypes.STRING,
        //   allowNull: false
        // },
        // url: {
        //   type: DataTypes.STRING,
        //   allowNull: false
        // }
        
      },
      password: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      titulo: {
        type: DataTypes.STRING,
      },
      Descripcion: {
        type: DataTypes.STRING,
      },
      isDoctor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["active", "deleted", "incomplete"],
        defaultValue: "active",
      },
      precio: {
        type: DataTypes.INTEGER,
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
