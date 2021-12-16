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
    let v1 = validateInput(email , validatorModule.isValidEmail ,false);
    let v2 = validateInput(name, validatorModule.isNotEmpty,false);
    let v3 = validateInput(family_name, validatorModule.isNotEmpty,false);
    v = v1 && v2 && v3;
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": document.getElementById("Email").value,
            "name": document.getElementById("First_name").value,
            "family_name": document.getElementById("Family_name").value,
            "valid":v
        })
    }).then(function(response) {
        return response.json();
    });
    return v;


};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("register-button").addEventListener("click",validateRegisterForm);

});