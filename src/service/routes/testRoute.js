/**
 * Test Route
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


module.exports = function (container) {

//    var messageEndpoint = container.process(require("../endpoints/MessageEndpoint"));

    return {

        example: {

            get: function (req, res, cb) {
                res.send(200, {
                    fart: 2
                });

                cb();
            }

        }

    };


};
