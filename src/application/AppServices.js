/**
 * App Services
 *
 * The entry point for the app tier.
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;


/* Files */


module.exports = Base.extend({


    /**
     * Get Services
     *
     * Returns the services registered to the class
     *
     * @returns {object}
     */
    getServices: function () {
        return {
            Test: require("./Test/Service")
        };
    }


});
