'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
    /**
     * Promise to fetch record
     *
     * @return {Promise}
     */
  
     // Need Populate Full prod attributes of childs
    findOne(params, populate) {
        return strapi.query('prod-product').findOne(params, ['prod_attributes','discounts',
            {
                path: 'prod_childs',
                populate: {
                  path: 'prod_attributes',
                },
            },
            {
              path: 'prod_childs',
              populate: {
                path: 'discounts',
              },
            },
            {
                path: 'prod_parent',
                populate: {
                  path: 'prod_attributes',
                },
            },
            {
              path: 'prod_parent',
              populate: {
                path: 'discounts',
              },
          },
        ]);
    },
  };
