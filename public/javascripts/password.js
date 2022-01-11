const PassModule = (function() {
    "use strict";

});

// validate the input elements
const validatePassForm = (event) => {
    let v;
    let pass = document.getElementById("password").trim();
    let confirm = document.getElementById("confirm").trim();

    // display all errors, force checking all fields
    let v1 = validateInput(pass , validatorModule.validPassword ,false);
    let v2= true;
    if(v1)
        v2 = validateInput([confirm,pass] ,validatorModule.samePasswords , true )
    v = v1 && v2;
    if(!v)
        event.preventDefault();
    return v;
};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("password-button").addEventListener("click",validatePassForm);
});