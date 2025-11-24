require("dotenv").config()

const jwt = require("jsonwebtoken");

module.exports = {
    apiKeyMiddleware: (req, res, next) => {
        const api_key = req.header('x-api-key');

        if (api_key && api_key == process.env.API_KEY) {
            console.log(api_key);
            return next();
        }

        return res.status(401).type('json').json({
            "error": true,
            "message": "Not Authorized",
            data: []
        });
    },

    jwtMiddleware: (req, res, next) => {
        const authHeader = req.headers.authorization.split(" ")[1];

        // console.log(authHeader);
        if (!authHeader) {
            return res.status(401).type("json").json({
                "error": true,
                "message": "Not Authorized",
                "data": []
            });
        }

        try {
            const decoded = jwt.verify(authHeader, process.env.JWT_KEY);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).type("json").json({
                "error": true,
                "message": "Not Authorized",
                "data": []
            });
        }
    }
}