import { NextFunction, Request, Response } from 'express';
import { isSupportedLanguage } from '../utils';

export function SupportedLanguage(inReq: Request, inRes: Response, inNext: NextFunction): void | Response {
  const { language } = inReq.body || {};

  if (isSupportedLanguage(language)) {
    return inNext();
  }

  return inRes.status(400).json({
    language,
    message: 'Provided language is not supported'
  });
}
