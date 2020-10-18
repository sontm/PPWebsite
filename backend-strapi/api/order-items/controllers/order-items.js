'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

function isArray(a) {
    return (!!a) && (a.constructor === Array);
};
module.exports = {
    /**
     * Customized Create Multiple Element (Array)
     *
     * @return {Object}
     */
  
    async create(ctx) {
        let entity;
        let data = ctx.request.body;
        if (isArray(data)) {
            if (data.length) {
                for (let i = 0; i < data.length; i++) {
                    entity = await strapi.services['order-items'].create(data[i]);
                }
            }
        } else {
            // Single element
            entity = await strapi.services['order-items'].create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models['order-items'] });
    },
};
