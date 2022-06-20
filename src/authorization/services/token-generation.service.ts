import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { catchTokenError } from '../utils';

config();

export const generateAccessToken = <T extends string | object | Buffer>(
  inPayload: T,
  inExpiresIn: number | string
): string => {
  return jwt.sign(inPayload, process.env.SECRET_TOKEN_ACCESS as string, {
    expiresIn: inExpiresIn
  });
};

export const verifyAccessToken = (
  inToken: string,
  inRes: Response,
  inSecret: string,
  inCb: (inUserEmail: string) => void
): void => {
  jwt.verify(inToken, inSecret, (inErr, inDecoded) => {
    if (inErr) {
      catchTokenError(inErr, inRes);
      return;
    }

    const { email } = inDecoded as { email: string };
    inCb(email);
  });
};
