/**
 * Server
 *
 * ***DESCRIPTION***
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");
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

        var self = this;

        options = datatypes.setObject(options, {});

        self.port = datatypes.setInt(options.port, null);

        if (self.port === null) {
            throw new Error("server port must be set as an integer");
        }

        /* Create instance of the server */
        self._server = restify.createServer({
            certificate: options.certificate,
            formatters: options.formatters,
            handleUpgrades: options.handleUpgrades,
            key: options.key,
            log: options.logger,
            name: options.name,
            spdy: options.spdy,
            version: options.version
        });

    },


    /**
     * Accept Parser
     *
     * Makes the server use the accept parse.  If
     * options are not an array, uses the default
     * restify options.  Returns this to make the
     * method chainable.
     *
     * @param options
     * @returns {exports}
     */
    acceptParser: function (options) {
        options = datatypes.setArray(options, this._server.acceptable);

        return this.use(restify.acceptParser(options));
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
     * After
     *
     * Set up a listener for the after event
     *
     * @param fn
     * @returns {exports}
     */
    after: function (fn) {
        this._server.on("after", fn);
        return this;
    },


    /**
     * Body Parser
     *
     * Allows the server to receive the HTTP body. Returns
     * this to make it chainable.
     *
     * @returns {exports}
     */
    bodyParser: function () {
        return this.use(restify.bodyParser());
    },


    /**
     * Get Server
     *
     * Returns the server instance
     *
     * @returns {*}
     */
    getServer: function () {
        return this._server;
    },


    /**
     * GZIP Response
     *
     * Makes the response GZIP compressed.  Returns
     * this to make it chainable.
     *
     * @returns {exports}
     */
    gzipResponse: function () {
        return this.use(restify.gzipResponse());
    },



    /**
     * Output Handler
     *
     * This handles the output.  This can be activated
     * directly or bundled up into a closure and passed
     * around.
     *
     * @param {object} err
     * @param {object} data
     * @param {object} req
     * @param {object} res
     * @param {function} cb
     */
    outputHandler: function (err, data, req, res, cb) {

        var statusCode = 200;
        var output;

        if (err) {

            /* Convert to a Restify error and process */
            if (err instanceof restify.RestError) {
                /* Already a RestError - use it */
                output = err;
            } else {

                /* Convert to a restify-friendly error */
                statusCode = _.isFunction(err.getHttpCode) ? err.getHttpCode() : 500;
                output = _.isFunction(err.getDetail) ? err.getDetail() : err;

            }

            /* Emit the error */
            this.emit("error", err);

        } else if (data) {
            /* Success */
            output = data;
        } else {
            /* No content */
            statusCode = 204;
        }

        /* Push the output */
        res.send(statusCode, output);

        /* Activate the callback so the "after" event is triggered */
        if (_.isFunction(cb)) {
            cb();
        }

    },


    /**
     * Pre
     *
     * Set up middleware to be ran at the start
     * of the stack.
     *
     * @param fn
     * @returns {exports}
     */
    pre: function (fn) {
        this._server.pre(fn);
        return this;
    },


    /**
     * Start
     *
     * Starts up the server and returns a promise
     *
     * @params {function} cb
     * @returns {*}
     */
    start: function (cb) {
        return this.getServer().listen(this.port, cb);
    },


    /**
     * Query Parser
     *
     * Parses the query strings.  The mapParams option
     * allows you to decide if you want to map req.query
     * to req.params - false by default.  Returns this
     * to make it chainable.
     *
     * @param {boolean} mapParams
     * @returns {exports}
     */
    queryParser: function (mapParams) {

        mapParams = datatypes.setBool(mapParams, false);

        return this.use(restify.queryParser({
            mapParams: mapParams
        }));
    },


    /**
     * Uncaught Exception
     *
     * Listen to uncaught exceptions
     *
     * @param fn
     */
    uncaughtException: function (fn) {
        this._server.on("uncaughtException", fn);
        return this;
    },


    /**
     * Use
     *
     * Exposes the use method on the server. Can accept
     * a function or an array of functions.
     *
     * @param fn
     * @returns {exports}
     */
    use: function (fn) {
        this._server.use(fn);
        return this;
    }


});
