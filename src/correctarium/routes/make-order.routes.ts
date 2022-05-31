import express from 'express';
import { getDocumentEstimation } from '../controllers';
import { ReadFile, SupportedLanguage } from '../middlewares';

const router = express.Router();

router.post('/make-order', [SupportedLanguage, ReadFile], getDocumentEstimation);

export default router;
