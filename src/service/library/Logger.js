/**
 * Logger
 *
 * Presents a consistent interface for the Logger
 * class.  Individual logger types (bunyan, log4js)
 * should extend this.  This can be thought of in
 * the same way as an abstracted class.
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;


/* Files */


module.exports = Base.extend({


    /**
     * Set Level
     *
     * Sets the log level
     *
     * @param {string} level
     */
    setLevel: function (level) {
        this._setLevel(level);
    },


    /**
     * Triggers
     *
     * This is in order, from most to least severe
     */


    fatal: function (message) {
        return this._trigger(6, message);
    },


    error: function (message) {
        return this._trigger(5, message);
    },


    warn: function (message) {
        return this._trigger(4, message);
    },


    info: function (message) {
        return this._trigger(3, message);
    },


    debug: function (message) {
        return this._trigger(2, message);
    },


    trace: function (message) {
        return this._trigger(1, message);
    }


});
