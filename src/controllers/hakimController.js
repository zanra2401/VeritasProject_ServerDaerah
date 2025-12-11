const { Hakim } = require(__dirname + "/../models");

module.exports = {
    // Get all Hakim
    getAllHakim: async (req, res) => {
        try {
            const { page = 1, limit = 10, search = '' } = req.query;
            const offset = (page - 1) * limit;
            
            const { count, rows } = await Hakim.findAndCountAll({
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

    // Get Hakim by ID
    getHakimById: async (req, res) => {
        try {
            const { id } = req.params;
            const hakim = await Hakim.findByPk(id);
            
            if (!hakim) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Hakim not found",
                    "data": []
                });
            }
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Success",
                "data": hakim
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Create Hakim
    createHakim: async (req, res) => {
        const payload = req.body;
        
        try {
            const hakim = await Hakim.create(payload);

            return res.status(201).type('json').json({
                "error": false,
                "message": "Hakim created successfully",
                "data": hakim
            });

        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Update Hakim
    updateHakim: async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            
            const hakim = await Hakim.findByPk(id);
            if (!hakim) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Hakim not found",
                    "data": []
                });
            }
            
            await hakim.update(payload);
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Hakim updated successfully",
                "data": hakim
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Delete Hakim
    deleteHakim: async (req, res) => {
        try {
            const { id } = req.params;
            
            const hakim = await Hakim.findByPk(id);
            if (!hakim) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Hakim not found",
                    "data": []
                });
            }
            
            await hakim.destroy();
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Hakim deleted successfully",
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