import { Request, Response } from 'express';
import { readFile } from 'fs/promises';
import { StatusCode } from '../enums';
import { getCollectionPath, getFolderPath } from '../utils';

export const retrieveDbController = async (inReq: Request, inRes: Response): Promise<void> => {
  const lFolderPath = getFolderPath(inReq);
  const lCollectionPath = getCollectionPath(lFolderPath);

  try {
    const lCollection = await readFile(lCollectionPath, 'utf-8');
    inRes.status(StatusCode.Ok).send(lCollection);
  } catch (e) {
    inRes
      .status(StatusCode.InternalServerError)
      .send({ msg: 'Attempt to retrieve collection was unsuccessful! Please, try again later', err: e });
  }
};
