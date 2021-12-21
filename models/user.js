const fs = require('fs');
const path = require('path');

module.exports = class user {
    constructor(email , name , family) {
        this.email = email;
        this.first_name = name;
        this.family_name = family;
    }
    save() {
        userList.push(this);
    }

    static fetchAll() {
        return (userList);
    }
};
let userList = [];
