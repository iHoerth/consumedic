const {setNewAdmin} = require("../controllers/panelAdmin/setNewAdmin")

const setAdmin = async (req, res) => {
  const { id } = req.body;
  try {
    const result =await setNewAdmin(id)
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  setAdmin,

};
