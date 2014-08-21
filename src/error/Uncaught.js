/**
 * Uncaught
 *
 * This is a special error.  It is effectively a duplication
 * of the Application error, but it's only to be used when
 * the stack detects an uncaught exception.
 *
 * This cannot be recovered from.
 */

"use strict";


/* Node modules */
var util = require("util");


/* Third-party modules */


/* Files */
var ApplicationError = require("./Application");


function Uncaught (message) {

    ApplicationError.apply(this, arguments);

}


util.inherits(Uncaught, ApplicationError);


module.exports = Uncaught;
