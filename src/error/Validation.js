/**
 * Validation
 *
 * A validation error should be used when the
 * user's input has failed.  This would normally
 * result in an HTTP 400 error.
 *
 * This can be recovered from.
 */

"use strict";


/* Node modules */
var util = require("util");


/* Third-party modules */
var _ = require("lodash");
var steeplejack = require("steeplejack");


/* Files */


function Validation (message) {

    steeplejack.Exceptions.Validation.apply(this, arguments);

    this.httpCode = 400;
    this.type = "ValidationError";

}


util.inherits(Validation, steeplejack.Exceptions.Validation);


_.extend(Validation.prototype, {


    getDetail: function () {

        return {
            type: this.getType(),
            message: this.getMessage(),
            err: this.getErrors()
        }

    },


    getHttpCode: function () {
        return this.httpCode;
    }


});


module.exports = Validation;
