/**
 * Store
 *
 * This is to be used when an error is returned
 * from a data store.  This means that the application
 * is (probably) ok, but that the data stores
 * have returned an error that we weren't expecting.
 * This would normally result in an HTTP 503
 * error.
 *
 * This cannot be recovered from.
 */

"use strict";


/* Node modules */
var util = require("util");


/* Third-party modules */


/* Files */
var ApplicationError = require("./Application");


function Store (message) {

    ApplicationError.apply(this, arguments);

    this.httpCode = 503;
    this.type = "StoreError";

}


util.inherits(Store, ApplicationError);


module.exports = Store;
