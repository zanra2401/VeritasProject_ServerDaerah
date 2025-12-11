require("dotenv").config();
const { Admin } = require(__dirname + "/../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    // Admin Login
    adminLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const adminInstance = await Admin.findOne({ where: { email } });
            if (!adminInstance) {
                return res.status(401).type("json").json({
                    "error": true,
                    "message": "Not Authorized",
                    "data": []
                });
            }
            const isPasswordValid = await bcrypt.compare(password, adminInstance.password);
            if (!isPasswordValid) {
                return res.status(401).type("json").json({
                    "error": true,
                    "message": "Not Authorized",
                    "data": []
                });
            }
            const dataUser = {
                id: adminInstance.id,
                email,
                role: adminInstance.role
            };
            const token = jwt.sign(dataUser, process.env.JWT_KEY, { expiresIn: '1h' });
            
            return res.status(200).type("json").json({
                "error": false,
                "message": "login success",
                "data": {
                    "token": token
                }
            });
        } catch (err) {
            return res.status(500).type("json").json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Get all Admin
    getAllAdmin: async (req, res) => {
        try {
            const { page = 1, limit = 10, search = '' } = req.query;
            const offset = (page - 1) * limit;
            
            const { count, rows } = await Admin.findAndCountAll({
                where: search ? { 
                    [require('sequelize').Op.or]: [
                        { nama_lengkap: { [require('sequelize').Op.like]: `%${search}%` } },
                        { email: { [require('sequelize').Op.like]: `%${search}%` } }
                    ]
                } : {},
                attributes: { exclude: ['password'] },
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

    // Get Admin by ID
    getAdminById: async (req, res) => {
        try {
            const { id } = req.params;
            const admin = await Admin.findByPk(id, {
                attributes: { exclude: ['password'] }
            });
            
            if (!admin) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Admin not found",
                    "data": []
                });
            }
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Success",
                "data": admin
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Create Admin
    createAdmin: async (req, res) => {
        try {
            const { email, password, nama_lengkap, role } = req.body;
            
            // Check if email already exists
            const existingAdmin = await Admin.findOne({ where: { email } });
            if (existingAdmin) {
                return res.status(400).type('json').json({
                    "error": true,
                    "message": "Email already exists",
                    "data": []
                });
            }
            
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const admin = await Admin.create({
                email,
                password: hashedPassword,
                nama_lengkap,
                role
            });
            
            const adminData = admin.toJSON();
            delete adminData.password;
            
            return res.status(201).type('json').json({
                "error": false,
                "message": "Admin created successfully",
                "data": adminData
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Update Admin
    updateAdmin: async (req, res) => {
        try {
            const { id } = req.params;
            const { email, nama_lengkap, role, password } = req.body;
            
            const admin = await Admin.findByPk(id);
            if (!admin) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Admin not found",
                    "data": []
                });
            }
            
            const updateData = { email, nama_lengkap, role };
            
            // If password is provided, hash it
            if (password) {
                updateData.password = await bcrypt.hash(password, 10);
            }
            
            await admin.update(updateData);
            
            const adminData = admin.toJSON();
            delete adminData.password;
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Admin updated successfully",
                "data": adminData
            });
        } catch (err) {
            return res.status(500).type('json').json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Delete Admin
    deleteAdmin: async (req, res) => {
        try {
            const { id } = req.params;
            
            const admin = await Admin.findByPk(id);
            if (!admin) {
                return res.status(404).type('json').json({
                    "error": true,
                    "message": "Admin not found",
                    "data": []
                });
            }
            
            await admin.destroy();
            
            return res.status(200).type('json').json({
                "error": false,
                "message": "Admin deleted successfully",
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