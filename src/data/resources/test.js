/**
 * Test
 *
 * This is a test resource to demonstrate how resources
 * work
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


module.exports = function (config, logger) {

    /* This example works like a simple SQL handler */
    return {

        query: function (query, cb) {

            cb(null, [{
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


};
