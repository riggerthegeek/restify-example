/**
 * Data Services
 *
 * Entry point for the data tier. It configures
 * and creates the stores and the resources.
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;
var datatypes = Base.datatypes;


/* Files */
var testResource = require("./resources/test");


module.exports = Base.extend({


    _construct: function (config, logger) {

        /* Make sure it's an object */
        config = datatypes.setObject(config, {});

        /* Build the resources - would recommend returning a generic-pool instance */
        this._resources = {
            test: testResource(config, logger)
        };

    },


    /**
     * Get Resources
     *
     * Returns the resources - this is synonymous with
     * a data connection
     *
     * @returns {object}
     */
    getResources: function () {
        return this._resources;
    },


    /**
     * Get Stores
     *
     * Returns the stores - this is a connection to a
     * database that has a resource attached
     *
     * @returns {object}
     */
    getStores: function () {
        return {
            test: require("./stores/test")
        };
    }


});
