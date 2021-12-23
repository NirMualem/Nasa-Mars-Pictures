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
    if(!v)
        event.preventDefault();
    return v;

};

const validatorLogin = (event) =>{
    let email = document.getElementById("Email");
    let pass = document.getElementById("Password");

    var myParams = { method: 'post',
        email: email,
        pass: pass ,
    };
    // fetch('http://localhost:3000//api//login// ', myParams)
    //     .then(correct) =>{
    //     if(!correct)
    //
    // }

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("register-button").addEventListener("click",validateRegisterForm);
    document.getElementById("login").addEventListener("click",validatorLogin);
});