/**
 * Product
 *
 * Defines the product controller
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


module.exports.__factory = function $productService (Products) {

    return {

        getProducts: function (cb) {

            var arr = new Products([{
                name: "product 1",
                price: "24"
            }, {
                name: "product 2",
                price: "28.99"
            }]);

            cb(null, arr);

        }

    };

};
