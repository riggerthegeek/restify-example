/**
 * app
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {Steeplejack} from "steeplejack";
import {Server} from "steeplejack/lib/server";
import {Restify} from "steeplejack-restify";


/* Files */


/* Create and configure the steeplejack app */
let app = Steeplejack.app({
    config: require("./config.json"),
    routesDir: "src/routes"
});


/* Output the config and the routes on start */
app.on("start", () => {

    console.log("--- Config ---");
    console.log(JSON.stringify(app.config, null, 4));
    console.log("---------------");

    console.log("--- Routes ---");
    console.log(app.routes.join("\n"));
    console.log("---------------");

});


/* Configure the server strategy */
app.run($config => {

    /* Configure the Restify strategy */
    let restify = new Restify({
        name: $config.server.name
    });

    /* Create the server instance */
    let server = new Server($config.server, restify);

    /* Configure the server */
    server
        .bodyParser()
        .gzipResponse();

    return server;

});


/* Export the instance */
export {app};
