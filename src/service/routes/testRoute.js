/**
 * Test Route
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */
var TestEndpoint = require("../endpoints/TestEndpoint");


module.exports = function (container, outputHandler) {

    var endpoint = container.process(TestEndpoint);

    return {

        "/": {

            get: [
                function (req, res, cb) {

                    endpoint.getHome(
                        function (err, data) {
                            outputHandler(err, data, req, res, cb);
                        }
                    );

                }
            ]

        },

        "/example": {

            get: function (req, res, cb) {

                var err;
                var data = {
                    stubbed: {}
                };

                outputHandler(err, data, req, res, cb);

            }

        }

    };


};
