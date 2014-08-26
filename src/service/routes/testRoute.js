/**
 * Test Route
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */
var authorization = require("../authorization");


module.exports = function ($outputHandler, $testEndpoint) {

    return {

        "/": {

            get: [
                function (req, res, cb) {

                    $testEndpoint.getHome(
                        function (err, data) {
                            $outputHandler(err, data, req, res, cb);
                        }
                    );

                }
            ]

        },

        "/example": {

            get: function (req, res, cb) {

                var err = null;
                var data = {
                    stubbed: {}
                };

                $outputHandler(err, data, req, res, cb);

            }

        }

    };


};
