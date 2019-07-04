import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isAuthenticated = {
    verifyToken: (req, res, next) => {
        // Get token from req.headers,authorization
        const token = req.headers.authorization;

        // If the is no token, then the requst is unauthorised\
        if (!token) {
            return res.status(401).json({
                status: 'error',
                error: 'Unauthorised request',
            });
        }

        // Decode the token
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            // Show an error if any when trying to decode the token
            console.log(err);
            if (err) {
                return res.status(403).json({
                    status: 'error',
                    error: 'An error occurred',
                });
            }
            // If the token was successfully decoded, assign the payload to req.user
            // req.user = decoded;
        });
        // next();
    },
};

export default isAuthenticated;