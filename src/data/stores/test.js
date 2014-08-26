/**
 * Test
 *
 * This is an example store, to show how it
 * interacts with the data resource.
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");


/* Files */


module.exports = function ($logger, $testResource) {


    return {

        getUserByUsernameAndPassword: function (username, password, cb) {

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

                    result = _.where(result, {
                        username: username,
                        password: password
                    });

                    result = result.length === 1 ? result[0] : null;

                    cb(null, result);

                });

            });

        },

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
