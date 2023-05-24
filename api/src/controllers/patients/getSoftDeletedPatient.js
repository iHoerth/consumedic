const { PacienteType } = require("../../db");
const { Op } = require("sequelize");

const getSoftDeletedPatient = async () => {
  return await PacienteType.findAll({
    paranoid: false,
    where: {
      deletedAt: {
        [Op.not]: null,
      },
    },
  });
};

module.exports = { getSoftDeletedPatient };
