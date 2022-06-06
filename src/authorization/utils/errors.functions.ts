import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCode } from '../enums';

export const catchTokenError = (inErr: jwt.VerifyErrors, inRes: Response): void => {
  if (inErr instanceof jwt.TokenExpiredError) {
    inRes.status(StatusCode.NotAuthorized).send({ msg: 'Unauthorized! Token has expired' });
    return;
  }

  inRes.status(StatusCode.NotAuthorized).send({ msg: 'Unauthorized' });
};
