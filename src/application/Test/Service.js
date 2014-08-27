/**
 * Service
 *
 * This is an example service file.  This is where
 * the business logic takes place.
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;


/* Files */


module.exports = function ($logger, $testStore) {


    return {

        getHome: function (cb) {

            $testStore.getUsers(function (err, result) {

                if (err) {
                    return cb(err, null);
                }

                cb(null, result);

            });

        }

    };


};
