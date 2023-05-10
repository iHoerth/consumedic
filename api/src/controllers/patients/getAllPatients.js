const { PacienteType } = require("../../db");

const getAllPatients = async () => {
  const patients = await PacienteType.findAll({
    where: { status: "active" },
    include: { all: true },
  });
  return patients;
};

module.exports = { getAllPatients };
