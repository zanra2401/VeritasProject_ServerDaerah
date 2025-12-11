const { Klasifikasi } = require(__dirname + "/../models");

module.exports = {
    // Get all Klasifikasi
    getAllKlasifikasi: async (req, res) => {
        try {
            const { page = 1, limit = 10, search = '' } = req.query;
            const offset = (page - 1) * limit;
            
            const { count, rows } = await Klasifikasi.findAndCountAll({
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

    // Get Klasifikasi by ID
    getKlasifikasiById: async (req, res) => {
        try {
            const { id } = req.params;
            const klasifikasi = await Klasifikasi.findByPk(id);
            
            if (!klasifikasi) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Klasifikasi not found",
                    "data": []
                });
            }
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Success",
                "data": klasifikasi
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Create Klasifikasi
    createKlasifikasi: async (req, res) => {
        const { nama } = req.body;

        try {
            const klasifikasi = await Klasifikasi.create({ nama });
            
            return res.status(201).type('json').json({
                "error": false,
                "message": "Klasifikasi created successfully",
                "data": klasifikasi
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Update Klasifikasi
    updateKlasifikasi: async (req, res) => {
        try {
            const { id } = req.params;
            const { nama } = req.body;
            
            const klasifikasi = await Klasifikasi.findByPk(id);
            if (!klasifikasi) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Klasifikasi not found",
                    "data": []
                });
            }
            
            await klasifikasi.update({ nama });
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Klasifikasi updated successfully",
                "data": klasifikasi
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Delete Klasifikasi
    deleteKlasifikasi: async (req, res) => {
        try {
            const { id } = req.params;
            
            const klasifikasi = await Klasifikasi.findByPk(id);
            if (!klasifikasi) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Klasifikasi not found",
                    "data": []
                });
            }
            
            await klasifikasi.destroy();
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Klasifikasi deleted successfully",
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
