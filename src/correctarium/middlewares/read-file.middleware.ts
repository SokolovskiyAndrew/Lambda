import { NextFunction, Request, Response } from 'express';

export function ReadFile(inReq: Request, inRes: Response, inNext: NextFunction): void | Response {
  const { count: lCharacterCount } = inReq.body || {};

  if (lCharacterCount) {
    return inNext();
  }

  return inRes.status(400).json({
    charCount: lCharacterCount,
    message: 'Cannot read a file or there is no content in file'
  });
}
