import propertyValidators from '../validators/property';

const propertyMiddleware = {
    propertyInputsValidator: (req, res, next) => {
        const { errors, isValid } = propertyValidators.propertyValidator(req.body);
        if (!isValid) {
            res.status(400).json(errors);
        }
        next();
    },
};

export default propertyMiddleware;