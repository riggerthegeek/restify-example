/**
 * index
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


export let route = ($output, $userService) => {


    return {

        "/": {


            get: [
                (req, res) => {

                    let emailAddress = req.query.emailAddress;

                    $output(req, res, () => {

                        return $userService.getUserByEmailAddress(emailAddress);

                    });

                }
            ]


        }

    };


};
