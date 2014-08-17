/**
 * Test
 *
 * This is a test resource to demonstrate how resources
 * work
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");
var datatypes = steeplejack.Base.datatypes;


/* Files */


module.exports = function (config, $logger) {

    /* This example works like a simple SQL handler */
    return {

        query: function (query, cb) {

            cb(null, [{
                id: 1,
                firstName: "Test",
                lastName: "Testington",
                emailAddress: "test@test.com",
                created: new Date()
            }]);

        }

    };


};
