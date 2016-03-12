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


            get: ({request}) => {

                let emailAddress = request.query.emailAddress;

                return $userService.getUserByEmailAddress(emailAddress);

            }


        }

    };


};
