/**
 * Test
 *
 * This is an example store, to show how it
 * interacts with the data resource.
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


module.exports = function ($logger, $testResource) {

    return {


        getUsers: function (cb) {

            $testResource.query("SELECT * FROM users", cb);

        }


    };

};
