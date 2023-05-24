const { DoctorType } = require("../../db");
const { Op } = require("sequelize");

const getSoftDeletedDoctor = async () => {
  return await DoctorType.findAll({
    paranoid: false,
    where: {
      deletedAt: {
        [Op.not]: null,
      },
    },
  });
};

module.exports = { getSoftDeletedDoctor };
