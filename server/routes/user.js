import express from 'express';

import userController from '../controllers/user';
import userMiddleware from '../middleware/user';

const userRouter = express.Router();

userRouter.post('/signup', userMiddleware.registerInputsValidator, userMiddleware.uniqueUser, userController.signUp);

userRouter.post('/signin', userMiddleware.loginInputValidator, userController.signIn);

export default userRouter;