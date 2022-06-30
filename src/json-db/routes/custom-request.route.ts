import express from 'express';
import { createDbController, retrieveDbController } from '../controllers';
import { dbExistValidation, forbiddenCharacters, noEmptyPathMiddleware } from '../middlewares';

const router = express.Router();

router.post(/./, [forbiddenCharacters, dbExistValidation(true)], createDbController);

router.get(/./, [noEmptyPathMiddleware, dbExistValidation(false)], retrieveDbController);

export default router;
