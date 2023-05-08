const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Especialidad",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
