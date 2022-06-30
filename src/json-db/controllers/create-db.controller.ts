import { Request, Response } from 'express';
import { StatusCode } from '../enums';
import { createDB } from '../services';
import { getFolderPath } from '../utils';

export const createDbController = async (inReq: Request, inRes: Response): Promise<void> => {
  const { body } = inReq;

  try {
    await createDB(getFolderPath(inReq), body);
    inRes.status(StatusCode.Created).send({ msg: 'New collection was created' });
  } catch (e) {
    inRes
      .status(StatusCode.InternalServerError)
      .send({ msg: 'Creating new collection was interrupted. Please, try again later' });
  }
};
