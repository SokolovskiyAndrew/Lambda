import { NextFunction, Request, Response } from 'express';
import url from 'url';
import { StatusCode } from '../enums';

export const noEmptyPathMiddleware = (inReq: Request, inRes: Response, inNext: NextFunction): void => {
  const lUrlPath = url.parse(inReq.url).pathname;

  if (!lUrlPath?.replace(/\//, '')) {
    inRes.status(StatusCode.BadRequest).send({ msg: 'Please, provide path as a name to your collection' });
    return;
  }

  inNext();
};
