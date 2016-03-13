/**
 * index
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


export let route = ($userService) => {


    return {

        "/": {

            get: (req) => {

                let emailAddress = req.query.emailAddress;

                return $userService.getUserByEmailAddress(emailAddress);

            }

        }

    };


};
