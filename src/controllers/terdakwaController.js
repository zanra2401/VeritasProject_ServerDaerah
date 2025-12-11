const { Terdakwa } = require(__dirname + "/../models");

module.exports = {
    // Get all Terdakwa
    getAllTerdakwa: async (req, res) => {
        try {
            const { page = 1, limit = 10, search = '' } = req.query;
            const offset = (page - 1) * limit;
            
            const { count, rows } = await Terdakwa.findAndCountAll({
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

    // Get Terdakwa by ID
    getTerdakwaById: async (req, res) => {
        try {
            const { id } = req.params;
            const terdakwa = await Terdakwa.findByPk(id);
            
            if (!terdakwa) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Terdakwa not found",
                    "data": []
                });
            }
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Success",
                "data": terdakwa
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Create Terdakwa
    createTerdakwa: async (req, res) => {
        const payload = req.body;

        try {
            const terdakwa = await Terdakwa.create(payload);

            return res.status(201).type('json').json({
                "error": false,
                "message": "Terdakwa created successfully",
                "data": terdakwa
            });

        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Update Terdakwa
    updateTerdakwa: async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            
            const terdakwa = await Terdakwa.findByPk(id);
            if (!terdakwa) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Terdakwa not found",
                    "data": []
                });
            }
            
            await terdakwa.update(payload);
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Terdakwa updated successfully",
                "data": terdakwa
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Delete Terdakwa
    deleteTerdakwa: async (req, res) => {
        try {
            const { id } = req.params;
            
            const terdakwa = await Terdakwa.findByPk(id);
            if (!terdakwa) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Terdakwa not found",
                    "data": []
                });
            }
            
            await terdakwa.destroy();
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Terdakwa deleted successfully",
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