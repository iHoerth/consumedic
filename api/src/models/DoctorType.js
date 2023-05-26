const { DataTypes } = require("sequelize");

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
        allowNull: false,
      },
      NumMatricula: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
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
        set(value) {
          const hashedPassword = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hashedPassword);
        },
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDoctor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["active", "deleted"],
        defaultValue: "active",
      },
      precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
