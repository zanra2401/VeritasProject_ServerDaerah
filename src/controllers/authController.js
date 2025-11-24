const authService = require(__dirname + "/../services/authService.js");

module.exports = {
    adminLogin: async (req, res) => {
        try {
            const token = await authService.login(req, res);
            if (token) {
                return res.status(200).type("json").json({
                    "error": false,
                    "message": "login success",
                    "data": {
                        "token": token
                    }
                })
            }

            return res.status(401).type("json").json({
                "error": true,
                "message": "Not Authorized",
                "data": []
            }); 
        } catch (err) {
            return res.status(500).type("json").json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    }
}