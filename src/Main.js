/**
 * Main
 *
 * Main entry point for the project
 */

"use strict";


/* Node modules */


/* Third-party modules */
var bunyan = require("bunyan");
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;


/* Files */
var Routes = require("./service/routes");
var Server = require("./service/library/Server");


module.exports = Base.extend({


    _construct: function (config) {

        /* Set config to the instance */
        this._config = config;

        /* Create the injector */
        this._createInjector();

        /* Create logger */
        this._createLogger();

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


    _createLogger: function () {
        this._logger = bunyan.createLogger({
            name: this._config.server.name
        });

        this._logger.level(this._config.logLevel);
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

        var config = this._config;

        var server = new Server({
            logger: this._logger,
            name: config.server.name,
            port: config.server.port
        });

        /* Add in the routes to the server */
        server.addRoutes(this._routes);

        /* Start the server */
        server.start()
            .then(function () {
                console.log("=== CONFIG ===");
                console.log(JSON.stringify(config, null, 2));
            })
            .catch(function (err) {
                /* Throw the error so it fails to start */
                throw err;
            });

    }


});
