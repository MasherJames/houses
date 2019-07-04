import Joi from 'joi';

const userRegisterSchema = Joi.object().keys({
    email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required(),
    firstname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    lastname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .alphanum()
        .min(6)
        .max(15)
        .required(),
    phonenumber: Joi.string()
        .alphanum()
        .min(6)
        .max(15)
        .required(),
    address: Joi.string()
        .min(5)
        .max(150)
        .required(),

});

const userSchemaLogin = Joi.object().keys({
    password: Joi.string()
        .alphanum()
        .min(6)
        .max(15)
        .required(),
    email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required(),
});

const propertySchema = Joi.object().keys({
    price: Joi.number()
        .min(10)
        .max(100000),
    state: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    city: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    address: Joi.string()
        .min(5)
        .max(150)
        .required(),
    type: Joi.string()
        .min(6)
        .max(15)
        .required(),
    imageurl: Joi.string()
        .alphanum()
        .required(),
});

export { userRegisterSchema, userSchemaLogin, propertySchema };