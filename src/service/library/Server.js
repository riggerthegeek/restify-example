/**
 * Server
 *
 * ***DESCRIPTION***
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");
var bluebird = require("bluebird");
var restify = require("restify");
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;
var datatypes = Base.datatypes;

/* Files */


module.exports = Base.extend({


    /**
     * Constructor
     *
     * Manages the creation of
     *
     * @param {object} options
     * @private
     */
    _construct: function (options) {

        options = datatypes.setObject(options, {});

        this.port = datatypes.setInt(options.port, null);

        if (this.port === null) {
            throw new Error("server port must be set as an integer");
        }

        /* Create a promisified instance of the server */
        this._server = bluebird.promisifyAll(restify.createServer({
            certificate: options.certificate,
            formatters: options.formatters,
            handleUpgrades: options.handleUpgrades,
            key: options.key,
            log: options.logger,
            name: options.name,
            spdy: options.spdy,
            version: options.version
        }));

    },


    /**
     * Add Routes
     *
     * Takes the route object and adds to the server
     * instance
     *
     * @param {object} routes
     */
    addRoutes: function (routes) {

        /* Add the URLs */
        _.each(routes, function (methods, route) {

            /* Add the HTTP verbs and endpoints */
            _.each(methods, function (func, method) {

                this[method](route, func);

            }, this);

        }, this._server);

    },


    /**
     * Start
     *
     * Starts up the server and returns a promise
     *
     * @returns {*}
     */
    start: function () {
        return this._server.listenAsync(this.port);
    }


});
