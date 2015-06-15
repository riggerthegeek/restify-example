/**
 * Products
 *
 * Defines the products collection, wrapping
 * the product model
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");


/* Files */


module.exports.__factory = function Products (Product) {

    return steeplejack.Collection.extend({

        model: Product

    });

};
