module.exports = (model) => {
    return {
        create: async (dataHakim) => {
            return await model.create(dataHakim);
        },
    
        get: async (limit, offset, where, sortBy = 'created_at', order = 'ASC') => {
            return await model.findAll({
                limit,
                offset,
                where,
                order: [[sortBy, order]]
            });
        },
    
        count: async (where = {}) => {
            return await model.count({
                where
            });
        },
    
        update: async (id, data) => {
            const hakim = await model.findByPk(id);
            return hakim.update(data);
        },
    
        softDelete: async (id) => {
            const hakim  = await model.findByPk(id);
            return hakim.destroy();
        },
    
        delete: async (id) => {
            const hakim  = await model.findByPk(id);
            return hakim.destroy({force: true});
        },
    
        restore: async (id) => {
            return await model.restore({where: {id}})
        }
    }
}