const PassModule = (function() {
    "use strict";

});

// validate the input elements
const validatePassForm = (event) => {
    let v;
    let pass = document.getElementById("password");
    let confirm = document.getElementById("confirm");

    // display all errors, force checking all fields
    let v1 = validateInput(pass , validatorModule.isNotEmpty ,false);
    let v2 = validateInput(confirm, validatorModule.isNotEmpty,false);
    let v3 = validateInput([pass , confirm] ,validatorModule.samePasswords , false )
    v = v1 && v2 && v3;
    if(!v)
        event.preventDefault();
    return v;

};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("password-button").addEventListener("click",validatePassForm);

});