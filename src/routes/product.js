/**
 * product
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
