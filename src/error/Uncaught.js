/**
 * Uncaught
 *
 * This is a special error.  It is effectively a duplication
 * of the Application error, but it's only to be used when
 * the stack detects an uncaught exception.
 *
 * CARE SHOULD BE TAKEN WHEN USING THIS. AS A RULE OF THUMB,
 * IT SHOULD ONLY BE USED WHEN RECOVERING FROM UNCAUGHT ERRORS.
 * IF IN DOUBT, USE AN APPLICATION ERROR!!!
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

    this.type = "UncaughtError";

}


util.inherits(Uncaught, ApplicationError);


module.exports = Uncaught;
