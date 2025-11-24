const paniteraService = require(__dirname + "../services/terdakwaService.js");

module.exports = {
    createTerdakwa: (req, res) => {
        const payload = req.body;

        try {
            const isCreated = terdakwaService.createTerdakwa(payload);
        } catch (err) {
            return res.status(500).type("json").json({
                "error": false,
                "message": "Server Error",
                "data": []
            });
        }
    }   
}