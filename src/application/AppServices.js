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


    _construct: function () {

        this._services = {
            Test: require("./Test/Service")
        };

    },


    /**
     * Get Services
     *
     * Returns the services registered to the class
     *
     * @returns {object}
     */
    getServices: function () {
        return this._services;
    }


});
