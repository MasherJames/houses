import uuid from 'uuid';
import moment from 'moment';

import { properties } from '../data/store';

export default class User {
    constructor(owner, price, state, city, address, type, imageUrl, status = 'available') {
        this.id = uuid.v4();
        this.owner = owner;
        this.status = status;
        this.price = price;
        this.state = state;
        this.city = city;
        this.address = address;
        this.type = type;
        this.created_on = moment(Date.now()).format('LL');
        this.image_url = imageUrl;
    }

    static getById(id) {
        const res = properties.find(property => property.id === id);
        return res;
    }
}