import express from 'express';
import * as controllers from '../controllers';
import { Routes } from '../enums';
import { checkUserExistence, registerValidation } from '../middlewares';

const router = express.Router();

router.post(Routes.SignIn, [registerValidation, checkUserExistence], controllers.signIn);

router.post(Routes.Login, controllers.login);

router.post(Routes.RefreshToken, controllers.refreshToken);

export default router;
