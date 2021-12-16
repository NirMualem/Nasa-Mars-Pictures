//a module for all string validation functions
// const validatorModule = (function() {
//     "use strict";
//     const isNotEmpty = function (str)  {
//         return  {
//             isValid: (str.value.length !== 0),
//             message: 'please enter a non empty value'
//         };
//     };
//
//     //check the status from the server.
//     function status(response) {
//         if (response.status >= 200 && response.status < 300) {
//             return Promise.resolve(response);
//         } else {
//             return Promise.reject(new Error(response.statusText));
//         }
//     }
//
//     return {
//         isNotEmpty: isNotEmpty,
//         status:status,
//     };
// }) ();

const LoginModule = (function() {
    "use strict";

});

// validate the input elements
const validateRegisterForm = (event) => {
    let v;
    let email = document.getElementById("Email");
    let name = document.getElementById("First_name");
    let family_name = document.getElementById("Family_name");

    // display all errors, force checking all fields
    let v1 = validateInput(email , validatorModule.isNotEmpty);
    let v2 = validateInput(name, validatorModule.isNotEmpty);
    let v3 = validateInput(family_name, validatorModule.isNotEmpty);

    v = v1 && v2 && v3;
    return v;
};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("register-button").addEventListener("click",validateRegisterForm);
});