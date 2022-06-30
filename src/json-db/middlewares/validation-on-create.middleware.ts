import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums';
import { getUrlPath, getUrlPathList } from '../utils';

export const forbiddenCharacters = (inReq: Request, inRes: Response, inNext: NextFunction): void => {
  const lPathList = getUrlPathList(getUrlPath(inReq));
  const lAllowedChars = /^[a-zA-Z0-9-]*$/;
  const lPassedVerification = lPathList.every((inPath) => lAllowedChars.test(inPath));

  if (!lPassedVerification) {
    inRes
      .status(StatusCode.BadRequest)
      .send({ msg: 'Special characters are forbidden! Your path should contain only letters and numbers' });
    return;
  }

  inNext();
};
