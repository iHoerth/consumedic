const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Cita', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fecha:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    respuestaMedico:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    // pagado:{
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // }
  },{
    timestamps: false
  });
};
