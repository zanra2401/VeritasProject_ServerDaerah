const hakimRepo = require(__dirname + "/../repositories/hakimRepo.js");
const Op = require('sequelize');

module.exports = (repositori, fields = []) => {
    return {
        create: async (dataHakim) => {
            return await repositori.create(dataHakim);
        },

        get: async (page = 0, limit = 10, search = '', filter = {}) => {
            const offset = (page - 1) * limit;
    
            const where = {}
            
            if (fields.length > 0) {
                where[Op.or] = fields.map((x) => {
                    return { x: { [Op.like]: `%${search}%` } };
                })
            }
    
            Object.keys(filter).forEach((key) => {
                where[key] = filter[key];
            });
            
            return await repositori.get(limit, offset, where);
        },
    
        update: async (id, dataHakim) => {
            return await repositori.update(id, dataHakim);
        },
    
        softDelete: async (id) => {
            return await repositori.softDelete(id);
        },
    
        delete: async (id) => {
            return await repositori.delete(id);
        },
    
        restore: async (id) => {
            return await repositori.rstore(id);
        }
    }
}