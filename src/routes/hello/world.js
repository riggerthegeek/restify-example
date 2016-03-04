/**
 * world
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


export let route = ($output) => {

    return {

        "/": {

            get: [
                (req, res) => {

                    $output(req, res, () => {

                        return {
                            hello: "world"
                        };

                    });

                }
            ]

        }

    };

};
