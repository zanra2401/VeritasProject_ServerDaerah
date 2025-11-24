'use-strict'


const putusanService = require(__dirname + "/../services/putusanService.js");

module.exports = {
    getPutusanById: async (req, res) => {
        const {id} = req.params;
        try {
            return res
                    .status(200)
                    .type("json")
                    .json({
                        "error": false,
                        "message": "Request Success",
                        "data": await putusanService.getPutusanById(id)
                    });
        } catch (err) {
            return res.status(500).type("json").json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    createPutusan: (req, res) => {
        try {
            const payload = req.body;
            console.log(payload);
            return res.send("test");
        } catch (err) {
            return res.status(500).type("json").json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    updatePutusan: (req, res) => {
        console.log(req);
    },

    deletePutusan: (req, res) => {
        console.log(req);
    }
}