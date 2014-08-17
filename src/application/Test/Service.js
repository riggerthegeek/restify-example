/**
 * Service
 *
 * This is an example service file.  This is where
 * the business logic takes place.
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


module.exports = function ($logger, $testStore) {


    return {

        getHome: function (cb) {

            $testStore.getUsers(function (err, result) {

                if (err) {
                    return cb(err);
                }

                cb(null, result);

            });

        }

    };


};
