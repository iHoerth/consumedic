const { getSocialSecurity } = require("../controllers/SocialSecurity/getSocialSecurity")
const {getAllSocialSecurities} = require("../controllers/SocialSecurity/getAllSocialSecurities")



const getSocialSecurities = async (req, res)=>{
    const {name} = req.query;
    try {
        const result = name ? await getSocialSecurity(name) : await getAllSocialSecurities();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getSocialSecurities,
}