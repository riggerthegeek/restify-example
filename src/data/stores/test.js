/**
 * Test
 *
 * This is an example store, to show how it
 * interacts with the data resource.
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;


/* Files */


module.exports = Base.extend({

    _construct: function ($logger, $testResource) {
        this._logger = $logger;
        this._testResource = $testResource;
    },


    getUsers: function (cb) {

        this._testResource.query("SELECT * FROM users", cb);

    }

});
