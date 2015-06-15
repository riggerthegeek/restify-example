/**
 * product
 *
 * The /product route.  This could also be
 * put in a directory called product and the
 * file renamed to index.js
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


module.exports = function ($outputHandler, $productService) {

    return {

        "/": {

            get: function (req, res) {

                $productService.getProducts(function (err, data) {
                    $outputHandler(err, data, req, res);
                });

            }

        }

    };

};
