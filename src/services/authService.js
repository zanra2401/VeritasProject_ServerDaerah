require("dotenv").config();
const adminRepo = require(__dirname + "/../repositories/adminRepo.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    processLogin: async (req, res) => {
        const {email, password} = req.body;
        const adminInstance = await adminRepo.getAdminByEmail(email);
        if (await bcrypt.compare(password, adminInstance.password)) {
            
            const dataUser = {
                id: adminInstance.id,
                email,
                role: adminInstance.role
            };

            const token = jwt.sign(
                dataUser,
                process.env.JWT_KEY,
                {expiresIn: '1h'}
            );

            return token;
        }

        return null;
    }
}