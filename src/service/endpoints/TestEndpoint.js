/**
 * Test Endpoint
 *
 * The endpoints on the test namespace.
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


module.exports = function ($logger, $testService) {


    return {


        getHome: function (cb) {

            $testService.getHome(cb);

        }


    };


};
