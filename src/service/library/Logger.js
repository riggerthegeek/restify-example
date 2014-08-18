/**
 * Logger
 *
 * Factory for the Bunyan logger
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;
var datatypes = Base.datatypes;


/* Files */


var Logger = Base.extend({


    _construct: function (options) {

        var bunyan = Logger.Bunyan();

        options = datatypes.setObject(options, {});

        /* This is highest-to-lowest */
        var logLevels = [
            "fatal",
            "error",
            "warn",
            "info",
            "debug",
            "trace"
        ];

        this._logger = bunyan.createLogger({
            name: options.name
        });

        /* Set the log level - default to error */
        var logLevel = datatypes.setEnum(options.logLevel, logLevels, "error");

        /* Create the log functions - these are all basically the same so do it programmatically */
        _.each(logLevels, function (level) {
            this[level] = function () {
                return this._logger[level].apply(this._logger, arguments);
            };
        }, this);

        /* Set the log level */
        this._logger.level(logLevel);

        return this;

    }


}, {

    /**
     * Bunyan
     *
     * Gets the Bunyan instance.  Put here so it can be
     * easily stubbed for testing
     *
     * @returns {*}
     * @constructor
     */
    Bunyan: function () {
        return require("bunyan");
    }

});


module.exports = Logger;
