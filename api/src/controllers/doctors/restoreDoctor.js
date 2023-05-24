const { DoctorType } = require("../../db");

const restoreDoctor = async ({ id }) => {
  try {
    await DoctorType.restore({
      where: {
        id: id,
      },
    });

    return "Doctor restored successfully";
  } catch (error) {
    throw error;
  }
};

module.exports = { restoreDoctor };
