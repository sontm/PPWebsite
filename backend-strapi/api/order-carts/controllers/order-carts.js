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
        let existedOne = await strapi.services['order-carts'].findOne(
            {UserID: ctx.request.body.UserID, ProductID: ctx.request.body.ProductID});
        if (existedOne) {
            // If Quantity is NULL, Increase Quantity

            if (!ctx.request.body.Quantity) {
                ctx.request.body.Quantity = existedOne.Quantity+1
                entity = await strapi.services['order-carts'].update(
                    {id: existedOne.id},
                    ctx.request.body);
            } else {
                entity = await strapi.services['order-carts'].update(
                    {id: existedOne.id},
                    ctx.request.body);
            }
        } else {
            // Update
            entity = await strapi.services['order-carts'].create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models['order-carts'] });
    },
};
