const penuntutUmumService = require(__dirname + "../services/penuntutUmumService.js");

module.exports = {
    createPenuntutUmum: (req, res) => {
        const payload = req.body;
        try {
            const isCreated = penuntutUmumService.createPenuntutUmum(payload);
        } catch (err) {
            return res.status(500).type("json").json({
                "error": false,
                "message": "Server Error",
                "data": []
            });
        }
    }   
}