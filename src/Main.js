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
var AppServices = require("./application/AppServices");
var DataServices = require("./data/DataServices");
var Errors = require("./error");
var Routes = require("./service/routes");
var Server = require("./service/library/Server");


module.exports = Base.extend({


    _construct: function (config) {

        /* Create the injector */
        var injector = this._createInjector();

        /* Create logger */
        var logger = this._createLogger(config, injector);

        /* Start the data services */
        this._createDataServices(config, injector, logger);

        /* Start the app services */
        this._createAppServices(injector);

        /* Create the web server */
        this._createServer(config, logger, injector);

    },


    /**
     * Add Routes
     *
     * Adds the routes to the server
     *
     * @param {object} server
     * @param {object} injector
     * @private
     */
    _addRoutes: function (server, injector) {

        /* Create a closure for the outputHandler */
        var outputHandler = function () {
            return server.outputHandler.apply(server, arguments);
        };

        var routes = new Routes(injector, outputHandler);

        return routes.getRoutes();

    },


    /**
     * Create App Services
     *
     * Creats an instance of the app services and registers
     * the services with the Injector.
     *
     * @param {object} injector
     * @returns {object}
     * @private
     */
    _createAppServices: function (injector) {

        /* Invoke the application tier */
        var appServices = new AppServices();

        /* Flatten out the services and register the app services */
        _.each(steeplejack.Injector.Parser(appServices.getServices(), "$", "service"), function (fn, name) {
            injector.register(name, fn);
        });

        return appServices;

    },


    /**
     * Create Data Services
     *
     * Creates an instance of the data services and registers
     * the resources and stores with the Injector.
     *
     * @private
     */
    _createDataServices: function (config, injector, logger) {

        /* Invoke the data tier */
        var dataServices = new DataServices(config, logger);

        /* Flatten out and register the data resources */
        _.each(dataServices.getResources(), function (inst, name) {
            name = "$" + name + "Resource";
            injector.registerSingleton(name, inst);
        });

        /* And the stores */
        _.each(steeplejack.Injector.Parser(dataServices.getStores(), "$", "store"), function (fn, name) {
            injector.register(name, fn);
        });

        return dataServices;

    },


    /**
     * Create Logger
     *
     * Creates the logger instance and sets the level
     *
     * @param {object} config
     * @param {object} injector
     * @returns {object}
     * @private
     */
    _createLogger: function (config, injector) {
        var logger = bunyan.createLogger({
            name: config.server.name
        });

        /* Set the log level */
        logger.level(config.logLevel);

        /* Register this to the IOC container */
        injector.registerSingleton("$logger", logger);

        return logger;
    },


    /**
     * Create Injector
     *
     * This creates an instance of the injector that allows
     * us to inject in dependencies.
     *
     * @returns {object}
     * @private
     */
    _createInjector: function () {
        return new steeplejack.Injector();
    },


    /**
     * Create Server
     *
     * Handles the creation of the server and adding of
     * the routes
     *
     * @param {object} config
     * @param {object} logger
     * @param {object} injector
     * @private
     */
    _createServer: function (config, logger, injector) {

        var server = new Server({
            logger: logger,
            name: config.server.name,
            port: config.server.port
        });

        /* Listen for errors */
        server.on("error", function (err) {
            if (err instanceof Errors.Validation) {
                /* Debug validation errors */
                logger.debug(err);
            } else {
                /* Error on non-validation errors */
                logger.error(err);
            }
        });

        /* Configure the server options */
        server.acceptParser()
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
        server.addRoutes(this._addRoutes(server, injector));

        /* Start the server */
        server.start(function (err) {
            if (err) {
                throw err;
            }

            /* Send the config to STDOUT */
            console.log("=== CONFIG ===");
            console.log(JSON.stringify(config, null, 2));
        });

        return server;

    }


});
