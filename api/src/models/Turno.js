const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Turno', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dia_semana:{
      type: DataTypes.ENUM,
      values: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
      allowNull: false,
    },
    fecha:{
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora:{
      type: DataTypes.TIME,
      allowNull: false,
    },
    estado:{
      type: DataTypes.ENUM,
      values: ["libre", "ocupado", "cancelado"],
      defaultValue: "libre",
      allowNull: false,
    }
  },{
    timestamps: false
  });
};
