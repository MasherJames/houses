import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../models/User';
import { users } from '../data/store';

dotenv.config();

const userController = {
    signUp: (req, res) => {
        // destructure field values from reqquest.body
        const {
            email,
            firstname,
            lastname,
            password,
            phonenumber,
            address,
        } = req.body;
        // generate a salt with 10 rounds
        bcrypt.genSalt(10, (err, salt) => {
            // using the salt, generate a hash for the password
            bcrypt.hash(password, salt, (error, hash) => {
                if (error) {
                    res.status(500).json({
                        status: 'error',
                        error: 'bycrypt error',
                    });
                } else {
                    const payload = { email, firstname };
                    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 }, (e, token) => {
                        // An error is thrown if assinging of the token was not successful
                        if (e) {
                            throw err;
                        } else {
                            // Create a new instance of the user class
                            const newUser = new User(email, firstname, lastname, hash, phonenumber, address);
                            // push the new object user to a list
                            users.push(newUser);
                            return res.status(201).json({
                                status: 'success',
                                data: newUser,
                                token,
                            });
                        }
                    });
                }
            });
        });
    },

    signIn: (req, res) => {
        const {
            email,
            password,
        } = req.body;
        // Find if the user is existing
        const currentuser = User.getByEmail(email);
        if (!currentuser) {
            return res.status(404).json({
                status: 'error',
                error: 'There is no user with this email',
            });
        }

        bcrypt.compare(password, currentuser.password).then((isMatch) => {
            if (!isMatch) {
                return res.status(401).json({
                    status: 'error',
                    error: 'Password is incorrect',
                });
            }
            // User payload for login
            const payload = {
                email: currentuser.email,
                firstname: currentuser.first_name,
                id: currentuser.id,
            };

            jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
                // An error is thrown if assinging of the token was not successful
                if (err) {
                    throw err;
                } else {
                    const user = {
                        id: currentuser.id,
                        email: currentuser.email,
                        firstname: currentuser.first_name,
                        lastname: currentuser.last_name,
                    };

                    return res.status(200).json({
                        status: 'success',
                        data: user,
                        token,
                    });
                }
            });
        });

    },
};

export default userController;