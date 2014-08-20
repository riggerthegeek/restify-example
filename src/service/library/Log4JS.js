/**
 * Log4JS
 *
 * Factory for the Log4JS logger
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");
var log4js = require("log4js");
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;
var datatypes = Base.datatypes;


/* Files */


module.exports = Base.extend({


    _construct: function (options) {

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

        this._logger = log4js.getLogger();

        /* Set the log level - default to error */
        var logLevel = datatypes.setEnum(options.logLevel, logLevels, "error");

        /* Create the log functions - these are all basically the same so do it programmatically */
        _.each(logLevels, function (level) {
            this[level] = function () {
                return this._logger[level].apply(this._logger, arguments);
            };
        }, this);

        /* Set the log level */
        this._logger.setLevel(logLevel);

        return this;

    }


});
