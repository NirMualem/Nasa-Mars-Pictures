const fs = require('fs');
const path = require('path');

module.exports = class User {
    constructor(email , name , family, password) {
        this.email = email;
        this.first_name = name;
        this.family_name = family;
        this.password = password;
    }
    save() {
        userList.push(this);
    }

    static fetchAll() {
        return (userList);
    }
};
let userList = [];
