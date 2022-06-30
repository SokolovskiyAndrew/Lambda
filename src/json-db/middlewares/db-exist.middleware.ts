import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums';
import { getFolderPath, isEntityExist } from '../utils';

export const dbExistValidation = (
  inNoDbExpected: boolean
): ((inReq: Request, inRes: Response, inNext: NextFunction) => Promise<void>) => {
  return async (inReq: Request, inRes: Response, inNext: NextFunction): Promise<void> => {
    const lIsCollectionExist = await isEntityExist(getFolderPath(inReq));
    const lFailedResMsg = inNoDbExpected
      ? 'Database with provided name already exists'
      : 'No database with provided name';

    if (lIsCollectionExist === inNoDbExpected) {
      inRes.status(StatusCode.BadRequest).send({ msg: lFailedResMsg });
      return;
    }
    inNext();
  };
};
