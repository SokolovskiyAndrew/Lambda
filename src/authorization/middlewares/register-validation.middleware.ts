import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums';
import { Credentials } from '../interfaces';

export const registerValidation = (inReq: Request, inRes: Response, inNext: NextFunction): void => {
  const { email, password } = (inReq.body as Credentials) || {};
  const lEmailRegexRule = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const lPasswordMinCharAmount = 6;

  if (!lEmailRegexRule.test(email)) {
    inRes.status(StatusCode.BadRequest).send({ msg: 'Provided email does not match email pattern' });
    return;
  }

  if (password?.length < lPasswordMinCharAmount) {
    inRes.status(StatusCode.BadRequest).send({ msg: 'Password length does not meet requirements' });
    return;
  }

  inNext();
};
