'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    /**
     * Customized Upsert the record.
     *
     * @return {Object}
     */
  
    async create(ctx) {
        let entity;
        // FInd if Exist: UserID and ProductID
        let existedOne = await strapi.services['recent-views'].findOne(
            {UserID: ctx.request.body.UserID, ProductID: ctx.request.body.ProductID});
        if (existedOne) {
            // If Quantity is NULL, Increase View Count
            if (!ctx.request.body.ViewCount) {
                ctx.request.body.ViewCount = existedOne.ViewCount+1
                ctx.request.body.When = Date.now()
                entity = await strapi.services['recent-views'].update(
                    {id: existedOne.id},
                    ctx.request.body);
            } else {
                ctx.request.body.ViewCount = 1
                ctx.request.body.When = Date.now()
                entity = await strapi.services['recent-views'].update(
                    {id: existedOne.id},
                    ctx.request.body);
            }
        } else {
            // Not Exist, Create
            ctx.request.body.When = Date.now()
            ctx.request.body.ViewCount = 1
            entity = await strapi.services['recent-views'].create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models['recent-views'] });
    },
};
