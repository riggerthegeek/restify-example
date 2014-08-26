/**
 * Endpoints
 *
 * Exposes the endpoints from the service tier
 */

"use strict";


/* Node modules */
var fs = require("fs");


/* Third-party modules */
var _ = require("lodash");
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;


/* Files */


var Endpoints = Base.extend({


    _construct: function () {

        this._endpoints = this._getTopLevelEndpoints();

    },


    /**
     * Get Top Level Endpoints
     *
     * This gets the top level endpoint file names
     *
     * @returns {object}
     * @private
     */
    _getTopLevelEndpoints: function () {

        return _.reduce(Endpoints.GetEndpointFiles(), function (result, filename) {

            /**
             * Split into segments - first is require name,
             * second is route name, third looks for "Route."
             * as we don't care about the extension
             */
            var segments = filename.match(/^((\w{1,})(Endpoint))\./);

            if (segments !== null) {
                var requireName = segments[1];
                var route = segments[2];

                /* Add the endpoint to the stack */
                var Endpoint = Endpoints.LoadFile(requireName);

                /* Get the route and process dependencies */
                result[route] = Endpoint;

            }

            return result;

        }, {}, this);

    },


    /**
     * Get Endpoints
     *
     * Gets the endpoints
     *
     * @returns {*}
     */
    getEndpoints: function () {
        return this._endpoints;
    }


}, {


    /**
     * Load File
     *
     * Loads up the file and returns the constructor. Put
     * into a static method so it can be stubbed for testing.
     *
     * @param {string} file
     * @returns {function}
     */
    LoadFile: function (file) {
        return require("./" + file);
    },


    /**
     * Get Files
     *
     * Gets the files.  Whilst it's not terribly
     * good form to do synchronous file tasks, as this
     * is only run once and before the server starts,
     * it's probably acceptable.
     *
     * @returns {object}
     * @private
     */
    GetEndpointFiles: function () {
        return fs.readdirSync(__dirname);
    }


});


module.exports = Endpoints;
