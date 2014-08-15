/**
 * Store
 *
 * An application error is to be used when something
 * has gone wrong with the application.  This would
 * normally result in an HTTP 500 error.
 *
 * This cannot be recovered from.
 */

"use strict";


/* Node modules */
var util = require("util");


/* Third-party modules */
var _ = require("lodash");
var steeplejack = require("steeplejack");


/* Files */


function Application (message) {

    steeplejack.Exceptions.Fatal.apply(this, arguments);

    this.httpCode = 500;
    this.type = "ApplicationError";

}


util.inherits(Application, steeplejack.Exceptions.Fatal);


_.extend(Application.prototype, {


    getDetail: function () {

        return {
            type: this.getType(),
            message: this.getMessage()
        }

    },


    getHttpCode: function () {
        return this.httpCode;
    }


});


module.exports = Application;
