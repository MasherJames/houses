import uuid from 'uuid';

import { users } from '../data/store';
import { pool } from '../index';

export default class User {
    constructor(email, firstName, lastName, password, phoneNumber, address, isAdmin = false) {
        this.id = uuid.v4();
        this.email = email;
        this.first_name = firstName;
        this.last_name = lastName;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.isAdmin = isAdmin;
    }

    static getByEmail(email) {
        const res = users.find(user => user.email === email);
        return res;
    }
}