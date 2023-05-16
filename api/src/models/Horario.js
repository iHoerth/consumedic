const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Horario', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dia_semana:{
      type: DataTypes.ENUM,
      values: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      allowNull: false,
    },
    atiende:{
      type: DataTypes.ENUM,
      values: ["si", "no"],
      allowNull: false,
    },
    horario_inicio:{
      type: DataTypes.TIME,
      allowNull: true,
    },
    horario_fin:{
        type: DataTypes.TIME,
        allowNull: true,
    },
    duracion_turno:{
        type: DataTypes.TIME,
        allowNull: true,
    },
  },{
    timestamps: false
  });
};
