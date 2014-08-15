/**
 * Main
 *
 * Main entry point for the project
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");
var bunyan = require("bunyan");
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;


/* Files */
var Errors = require("./error");
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

        var server = this._server;

        /* Create a closure for the outputHandler */
        var outputHandler = function () {
            return server.outputHandler.apply(server, arguments);
        };

        var routes = new Routes(this._container, outputHandler);

        return routes.getRoutes();

    },


    /**
     * Create Logger
     *
     * Creates the logger instance and sets the level
     *
     * @private
     */
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
        var logger = this._logger;

        this._server = new Server({
            logger: logger,
            name: config.server.name,
            port: config.server.port
        });

        /* Listen for errors */
        this._server.on("error", function (err) {
            if (err instanceof Errors.Validation) {
                /* Debug validation errors */
                logger.debug(err);
            } else {
                /* Error on non-validation errors */
                logger.error(err);
            }
        });

        /* Configure the server options */
        this._server.acceptParser()
            .bodyParser()
            .gzipResponse()
            .queryParser()
            .uncaughtException(function (req, res, route, err) {
                /* Listen for uncaught exceptions and note a fatal error */
                logger.fatal(err);

                var output = new Errors.Application("Unknown");
                res.send(500, output.getDetail());
            });

        /* Add in the routes to the server */
        this._server.addRoutes(this._addRoutes());

        /* Start the server */
        this._server.start()
            .then(function () {
                /* Send the config to STDOUT */
                console.log("=== CONFIG ===");
                console.log(JSON.stringify(config, null, 2));
            })
            .catch(function (err) {
                /* Throw the error so it fails to start */
                throw err;
            });

    }


});
