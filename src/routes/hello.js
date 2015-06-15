/**
 * hello
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


module.exports = function ($outputHandler) {

    return {

        "/:name": {

            get: function (req, res) {

                $outputHandler(null, {
                    hello: req.params.name
                }, req, res);

            }

        }

    };

};
