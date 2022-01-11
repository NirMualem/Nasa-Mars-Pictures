const LoginModule = (function() {
    "use strict";

});

const validatorLogin = (event) =>{
    let email = document.getElementById("Email").trim();
    let pass = document.getElementById("Password").trim();

    var myParams = { method: 'post',
        email: email,
        pass: pass ,
    };

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("login").addEventListener("click",validatorLogin);
});