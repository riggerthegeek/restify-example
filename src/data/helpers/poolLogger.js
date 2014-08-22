/**
 * Pool Logger
 *
 * Converts a generic-pool log into
 * our logger format
 *
 * @param {string} name
 * @param {object} logger
 * @returns {Function}
 */

"use strict";


/* Node modules */


/* Third-party modules */
var datatypes = require("steeplejack").Base.datatypes;


/* Files */


module.exports = function (name, logger) {

    name = datatypes.setString(name, null);

    if (name === null) {
        throw new Error("Name must be a string");
    }

    return function (message, level) {

        /* Default level to trace if not error/info/warn */
        if (["error", "info", "warn"].indexOf(level) === -1) {
            level = "trace";
        }

        logger[level](name + " pool: " + message);

    };

};
