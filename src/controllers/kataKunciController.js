const { KataKunci } = require(__dirname + "/../models");

module.exports = {
    // Get all KataKunci
    getAllKataKunci: async (req, res) => {
        try {
            const { page = 1, limit = 10, search = '' } = req.query;
            const offset = (page - 1) * limit;
            
            const { count, rows } = await KataKunci.findAndCountAll({
                where: search ? { nama: { [require('sequelize').Op.like]: `%${search}%` } } : {},
                limit: parseInt(limit),
                offset: offset
            });
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Success",
                "data": rows,
                "pagination": {
                    "total": count,
                    "page": parseInt(page),
                    "limit": parseInt(limit),
                    "pages": Math.ceil(count / limit)
                }
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Get KataKunci by ID
    getKataKunciById: async (req, res) => {
        try {
            const { id } = req.params;
            const kataKunci = await KataKunci.findByPk(id);
            
            if (!kataKunci) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "KataKunci not found",
                    "data": []
                });
            }
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Success",
                "data": kataKunci
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Create KataKunci
    createKataKunci: async (req, res) => {
        const { nama } = req.body;

        try {
            const kataKunci = await KataKunci.create({ nama });
            
            return res.status(201).type('json').json({
                "error": false,
                "message": "KataKunci created successfully",
                "data": kataKunci
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Update KataKunci
    updateKataKunci: async (req, res) => {
        try {
            const { id } = req.params;
            const { nama } = req.body;
            
            const kataKunci = await KataKunci.findByPk(id);
            if (!kataKunci) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "KataKunci not found",
                    "data": []
                });
            }
            
            await kataKunci.update({ nama });
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "KataKunci updated successfully",
                "data": kataKunci
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Delete KataKunci
    deleteKataKunci: async (req, res) => {
        try {
            const { id } = req.params;
            
            const kataKunci = await KataKunci.findByPk(id);
            if (!kataKunci) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "KataKunci not found",
                    "data": []
                });
            }
            
            await kataKunci.destroy();
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "KataKunci deleted successfully",
                "data": []
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    }
}
