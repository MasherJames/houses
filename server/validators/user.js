import Joi from 'joi';
import isEmpty from './isEmpty';
import { userRegisterSchema, userSchemaLogin } from './schemas';

const userValidators = {
    registerValidator: (data) => {
        const errors = {};

        Joi.validate(data, userRegisterSchema, (err) => {
            if (err) {
                errors.message = err.details[0].message.replace(/"/gi, '');
            }
        });

        return {
            errors,
            isValid: isEmpty(errors),
        };
    },

    loginValidator: (data) => {
        const errors = {};

        Joi.validate(data, userSchemaLogin, (err) => {
            if (err) {
                errors.message = err.details[0].message.replace(/"/gi, '');
            }
        });

        return {
            errors,
            isValid: isEmpty(errors),
        };
    },
};

export default userValidators;