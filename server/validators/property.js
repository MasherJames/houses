import Joi from 'joi';
import isEmpty from './isEmpty';
import { propertySchema } from './schemas';

const propertyValidators = {
    propertyValidator: (data) => {
        const errors = {};

        Joi.validate(data, propertySchema, (err) => {
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

export default propertyValidators;