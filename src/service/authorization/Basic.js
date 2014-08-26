/**
 * Basic
 *
 * Implements an HTTP Basic authentication method
 */

"use strict";


/* Node modules */


/* Third-party modules */
var BasicStrategy = require("passport-http").BasicStrategy;
var passport = require("passport");


/* Files */


module.exports = function (getUser) {

    /**
     * Configure passport
     */
    var strategy = new BasicStrategy(function (username, password, cb) {

        getUser(username, password, function (err, user) {

            if (err) {
                return cb(err);
            }

            if (user === null) {
                return cb(null, false);
            }

            return cb(null, user);

        });

    });

    passport.use(strategy);

    return passport.authenticate("basic", {
        session: false
    });

};
