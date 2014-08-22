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

            $testResource.acquire(function (err, client) {

                if (err) {
                    return cb(err, null);
                }

                client.query("SELECT * FROM table", function (err, result) {

                    $testResource.release(client);

                    if (err) {
                        cb(err, null);
                        return;
                    }

                    cb(null, result);

                });

            });

        }

    };

};
