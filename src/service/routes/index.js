/**
 * Routes
 *
 * Exposes the HTTP routes from the service
 * tier
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;


/* Files */


module.exports = Base.extend({


    _construct: function (container) {

        this._container = container;

        /* Create the router object with the top level routes */
        this._routes = new steeplejack.Router({
            test: this._addRoute("testRoute")
        });

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
        return require("./" + route)(this._container);
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
