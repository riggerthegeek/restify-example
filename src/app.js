/**
 * app
 *
 * Starts up the steeplejack example app
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");
var Restify = require("steeplejack-restify");


/* Files */


var app = steeplejack
    .app({
        config: require("./config"),
        env: require("./envvars"),
        modules: [
            "src/!(routes)/**/*.js"
        ],
        routeDir: "src/routes"
    })
    .run(function ($config) {

        return new Restify({
            port: $config.port
        });

    })
    .on("start", function (config) {
        console.log("Server started on port " + config.port);
    });


/* Export so we can test it */
module.exports = app;
