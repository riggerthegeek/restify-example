/**
 * Product
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");


/* Files */


module.exports.__factory = function Product () {

    return steeplejack.Model.extend({

        definition: {
            id: {
                type: "string"
            },
            name: {
                type: "string"
            },
            price: {
                type: "float",
                value: 0
            }
        }

    });

};
