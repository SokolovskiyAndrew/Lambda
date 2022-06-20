import express from 'express';
import { userMe } from '../controllers';
import { Routes } from '../enums';
import { verifyToken } from '../middlewares';

const router = express.Router();
const lSupportedUrl = new RegExp(`${Routes.User}\\d\\b`);

router.get(lSupportedUrl, verifyToken, userMe);

export default router;
