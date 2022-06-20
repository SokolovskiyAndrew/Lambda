import { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
import { StatusCode } from '../enums';
import { verifyAccessToken } from '../services';

config();

export const verifyToken = (inReq: Request, inRes: Response, inNext: NextFunction): void => {
  const lAuthHeader = inReq.header('Authorization');

  if (!lAuthHeader) {
    inRes.status(StatusCode.Forbidden).send({ msg: 'No authorization token provided' });
    return;
  }

  const lToken = lAuthHeader.split(' ')[1];

  verifyAccessToken(lToken, inRes, process.env.SECRET_TOKEN_ACCESS as string, (inUserEmail) => {
    inReq.body = {
      ...inReq.body,
      email: inUserEmail
    };

    inNext();
  });
};
