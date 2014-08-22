/**
 * Test
 *
 * This is a test resource to demonstrate how resources
 * work
 */

"use strict";


/* Node modules */


/* Third-party modules */
var poolModule = require("generic-pool");


/* Files */
var poolLogger = require("../helpers/poolLogger");


module.exports = function (config, logger) {


    return poolModule.Pool({
        name: "test",
        create: function (cb) {

            /**
             *  This example works like a simple SQL handler. This
             *  would what's returned by a SQL driver.
             */
            var resource = {

                query: function (query, callback) {

                    callback(null, [{
                        id: 1,
                        firstName: "Test",
                        lastName: "Testington",
                        emailAddress: "test@test.com",
                        created: new Date()
                    }, {
                        id: 2,
                        firstName: "Test2",
                        lastName: "Testington2",
                        emailAddress: "test2@test.com",
                        created: new Date()
                    }]);

                }

            };

            cb(null, resource);

        },
        destroy: function (client) {
            return;
        },
        log: poolLogger("TestResource", logger)
    });


};
