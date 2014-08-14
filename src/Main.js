/**
 * Main
 *
 * Main entry point for the project
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");
var promise = require("bluebird");
var restify = require("restify");
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;


/* Files */
var Routes = require("./service/routes");


module.exports = Base.extend({


    _construct: function (config) {

        /* Set config to the instance */
        this._config = config;

        /* Create the injector */
        this._createInjector();

        /* Add routes */
        this._addRoutes();

        /* Create the web server */
        this._createServer();

    },


    /**
     * Add Routes
     *
     * Adds the routes to the server
     *
     * @private
     */
    _addRoutes: function () {

        var routes = new Routes(this._container);

        this._routes = routes.getRoutes();

    },


    /**
     * Create Injector
     *
     * This creates an instance of the injector that allows
     * us to inject in dependencies.
     *
     * @private
     */
    _createInjector: function () {
        this._container = new steeplejack.Injector();
    },


    /**
     * Create Server
     *
     * Handles the creation of the server and adding of
     * the routes
     *
     * @private
     */
    _createServer: function () {

        var self = this;

        /* Create the server instance */
        var server = restify.createServer({

        });

        /* Promisify */
        server = promise.promisifyAll(server);

        /* Add in the routes to the server */
        _.each(self._routes, function (methods, route) {
            _.each(methods, function (func, method) {
                server[method](route, func);
            });
        });

        /* Start listening */
        server.listenAsync(self._config.port)
            .then(function () {
                console.log(JSON.stringify(self._config, null, 4));
            })
            .catch(function (err) {
                throw err;
            });

    }


});
