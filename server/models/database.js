import { pool } from '../index';
import logger from '../config/logger';

const createTables = () => {
    const users = `CREATE TABLE IF NOT EXISTS 
    users(
        id serial PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        firstname VARCHAR(255) NOT NULL,  
        lastname VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone_number VARCHAR(255) NOT NULL UNIQUE,
        address VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL
      )`;

    const properties = `CREATE TABLE IF NOT EXISTS
    properties(
        id serial PRIMARY KEY,
        owner_id INTEGER NOT NULL,
        price INTEGER NOT NULL,
        state VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        created_on TIMESTAMP,
        image VARCHAR(255) NOT NULL,
        status,
        FOREIGN KEY(owner_id) REFERENCES user(id)
      )`;
    return [users, properties];
};

const dropTables = () => {
    const users = 'DROP TABLE IF EXISTS users CASCADE';
    const properties = 'DROP TABLE IF EXISTS properties CASCADE';

    return `${users}; ${properties}`;
};

const migrate = () => {
    const create = createTables();
    const drop = dropTables();

    pool.query(drop)
        .then((res) => {
            console.log(res);
            logger.error(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            logger.error(err);
            pool.end();
        });

    pool.query(create)
        .then((res) => {
            console.log(res);
            logger.error(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            logger.error(err);
            pool.end();
        });


    pool.on('remove', () => {
        console.log('client removed');
        process.exit(0);
    });
};

module.exports = migrate;
require('make-runnable');