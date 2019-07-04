import userValidators from '../validators/user';
import User from '../models/User';

const userMiddleware = {
    registerInputsValidator: (req, res, next) => {
        const { errors, isValid } = userValidators.registerValidator(req.body);
        if (!isValid) {
            res.status(400).json(errors);
        }
        next();
    },

    uniqueUser: (req, res, next) => {
        if (User.getByEmail(req.body.email)) {
            res.status(409).json({
                status: 'error',
                error: 'user with this email already exists',
            });
        }
        next();
    },

    loginInputValidator: (req, res, next) => {
        const { errors, isValid } = userValidators.loginValidator(req.body);
        if (!isValid) {
            res.status(400).json(errors);
        }
        next();
    },
};

export default userMiddleware;