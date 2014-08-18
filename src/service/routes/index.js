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


module.exports = Base.extend({


    _construct: function (container, outputHandler) {

        this._container = container;
        this._outputHandler = outputHandler;

        /* Create the router object with the top level routes */
        this._routes = new steeplejack.Router(this._getTopLevelRoutes());

    },


    /**
     * Get Top Level Routes
     *
     * This gets the top level routes.  This looks for
     * files ending "Route.js".  Whilst it's not terribly
     * good form to do synchronous file tasks, as this
     * is only run once and before the server starts,
     * it's acceptable.
     *
     * @returns {object}
     * @private
     */
    _getTopLevelRoutes: function () {

        return _.reduce(fs.readdirSync(__dirname), function (result, filename) {

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
                result[route] = this._addRoute(requireName);
            }

            return result;

        }, {}, this);

    },


    /**
     * Add Route
     *
     * Adds a new route.  If the route isn't found,
     * or isn't a function, it will throw an error
     * and stop the server starting.
     *
     * @param route
     * @returns {*}
     * @private
     */
    _addRoute: function (route) {
        var Route = require("./" + route);

        return new Route(this._container, this._outputHandler);
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


});
