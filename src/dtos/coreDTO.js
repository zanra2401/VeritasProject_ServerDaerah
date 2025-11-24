module.exports = {
    baseDTO: (error, message, data) => {
        return {
            error,
            message,
            data
        };
    },

    paginateDTO: (total_page, page, next, prev, data) => {
        return {
             total_page,
             page, 
             next,
             prev,
             data
        };
    }
}