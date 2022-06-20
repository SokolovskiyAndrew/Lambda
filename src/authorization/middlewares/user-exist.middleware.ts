import { NextFunction, Request, Response } from 'express';
import { Users } from '../db';
import { Credentials } from '../interfaces';

export const checkUserExistence = async (inReq: Request, inRes: Response, inNext: NextFunction): Promise<void> => {
  const { email } = (inReq.body as Credentials) || {};

  try {
    const lExistedUser = await Users.findOne({ email });

    if (lExistedUser) {
      inRes.status(400).send({ msg: `There is already registered user with email ${lExistedUser.email}` });
      return;
    }
    inNext();
  } catch (e) {
    inRes.status(500).send({ message: `Check duplicates failed. Error: ${e}` });
  }
};
