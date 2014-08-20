/**
 * Routes
 *
 * Exposes the HTTP routes from the service
 * tier
 */

"use strict";


/* Node modules */
var fs = require("fs");


/* Third-party modules */
var _ = require("lodash");
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;


/* Files */


var Routes = Base.extend({


    _construct: function (container, outputHandler) {

        this._container = container;
        this._outputHandler = outputHandler;

        /* Create the router object with the top level routes */
        this._routes = new steeplejack.Router(this._getTopLevelRoutes());

    },


    /**
     * Get Top Level Routes
     *
     * This gets the top level route file names
     *
     * @returns {object}
     * @private
     */
    _getTopLevelRoutes: function () {

        return _.reduce(Routes.GetRouteFiles(), function (result, filename) {

            /**
             * Split into segments - first is require name,
             * second is route name, third looks for "Route."
             * as we don't care about the extension
             */
            var segments = filename.match(/^((\w{1,})(Route))\./);

            if (segments !== null) {
                var requireName = segments[1];
                var route = segments[2];

                /* Add the route to the stack */
                var Route = Routes.LoadFile(requireName);

                result[route] = new Route(this._container, this._outputHandler);
            }

            return result;

        }, {}, this);

    },


    /**
     * Get Routes
     *
     * Gets the routes from the router
     *
     * @returns {*}
     */
    getRoutes: function () {
        return this._routes.getRoutes();
    }


}, {


    /**
     * Load File
     *
     * Loads up the file and returns the constructor. Put
     * into a static method so it can be stubbed for testing.
     *
     * @param {string} route
     * @returns {function}
     */
    LoadFile: function (route) {
        return require("./" + route);
    },


    /**
     * Get Route Files
     *
     * Gets the route files.  Whilst it's not terribly
     * good form to do synchronous file tasks, as this
     * is only run once and before the server starts,
     * it's probably acceptable.
     *
     * @returns {object}
     * @private
     */
    GetRouteFiles: function () {
        return fs.readdirSync(__dirname);
    }


});


module.exports = Routes;
