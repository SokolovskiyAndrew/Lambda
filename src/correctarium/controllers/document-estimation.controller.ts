import { Request, Response } from 'express';
import { getDocumentExecutionTime, getPrice } from '../services';
import { isSupportedDocumentType } from '../utils';

export const getDocumentEstimation = (inReq: Request, inRes: Response): void => {
  if (!inReq.body) {
    inRes.status(400).json('No document data was provided');
    return;
  }

  const { language, mimetype, count: lCharacterCount } = inReq.body;
  const lIsSupportedType = isSupportedDocumentType(mimetype);
  const lPrice = getPrice(lCharacterCount, language, lIsSupportedType);
  const lExecutionTime = getDocumentExecutionTime(lCharacterCount, language, lIsSupportedType, Date.now());

  inRes.status(200).json({
    price: lPrice,
    ...lExecutionTime
  });
};
