const { Panitera } = require(__dirname + "/../models");

module.exports = {
    // Get all Panitera
    getAllPanitera: async (req, res) => {
        try {
            const { page = 1, limit = 10, search = '' } = req.query;
            const offset = (page - 1) * limit;
            
            const { count, rows } = await Panitera.findAndCountAll({
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

    // Get Panitera by ID
    getPaniteraById: async (req, res) => {
        try {
            const { id } = req.params;
            const panitera = await Panitera.findByPk(id);
            
            if (!panitera) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Panitera not found",
                    "data": []
                });
            }
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Success",
                "data": panitera
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Create Panitera
    createPanitera: async (req, res) => {
        const payload = req.body;

        try {
            const panitera = await Panitera.create(payload);
            
            return res.status(201).type('json').json({
                "error": false,
                "message": "Panitera created successfully",
                "data": panitera
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Update Panitera
    updatePanitera: async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            
            const panitera = await Panitera.findByPk(id);
            if (!panitera) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Panitera not found",
                    "data": []
                });
            }
            
            await panitera.update(payload);
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Panitera updated successfully",
                "data": panitera
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Delete Panitera
    deletePanitera: async (req, res) => {
        try {
            const { id } = req.params;
            
            const panitera = await Panitera.findByPk(id);
            if (!panitera) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Panitera not found",
                    "data": []
                });
            }
            
            await panitera.destroy();
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Panitera deleted successfully",
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