const terdakwaService = require(__dirname + "/../services/terdakwaService.js");

module.exports = {
    createTerdakwa: (req, res) => {
        const payload = req.body;

        try {
            const isCreated = terdakwaService.createTerdakwa(payload);

            res.status(200)
                .type('json')
                .json({
                    "error": false,
                    "message": "Berhasil Membuat Terdakwa",
                    "data": isCreated
                });

        } catch (err) {

            return res.status(500).type("json").json({
                "error": false,
                "message": "Server Error",
                "data": []
            });

        }
    }   
}