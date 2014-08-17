/**
 * Test Route
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


module.exports = function (container, outputHandler) {

    var testEndpoint = container.process(require("../endpoints/TestEndpoint"));

    return {

        "/": {

            get: [
                function (req, res, cb) {

                    testEndpoint.getHome(
                        function (err, data) {
                            outputHandler(err, data, req, res, cb);
                        }
                    );

                }
            ]

        },

        "/example": {

            get: [
                function (req, res, cb) {

                    var err;
                    var data = {
                        fart: 2,
                        query: req.query
                    };

                    outputHandler(err, data, req, res, cb);

                }
            ]

        }

    };


};
