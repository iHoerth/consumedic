const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "especialidad",
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
