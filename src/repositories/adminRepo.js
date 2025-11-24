
const {
    Admin
} = require(__dirname + "/../models");


module.exports = {
    getAdminByEmail: async (email) => {
        return await Admin.findOne({
            where: {
                email
            }
        });
    },

    
} 