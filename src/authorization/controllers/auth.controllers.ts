import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { randomNumberFromInterval } from '../../shared';
import { Tokens, Users } from '../db';
import { StatusCode } from '../enums';
import { Credentials } from '../interfaces';
import { isPasswordMatch, passwordCrypt, generateAccessToken, verifyAccessToken } from '../services';

config();

export const signIn = async (inReq: Request, inRes: Response): Promise<void> => {
  const { email, password } = (inReq.body as Credentials) || {};

  try {
    const lPasswordHash = await passwordCrypt(password);
    const lCreateResult = await Users.insertOne({ email, password: lPasswordHash });

    if (lCreateResult.acknowledged) {
      inRes.status(StatusCode.Created).send({ msg: `User with id ${lCreateResult.insertedId} was created` });
      return;
    }

    inRes
      .status(StatusCode.BadRequest)
      .send({ msg: 'A problem occurred on create user attempt. Please, try again later' });
  } catch (e) {
    inRes
      .status(StatusCode.InternalServerError)
      .send({ msg: 'A problem occurred on create user attempt. Please, try again later' });
  }
};

export const login = async (inReq: Request, inRes: Response): Promise<void> => {
  const { email, password } = inReq.query || {};

  try {
    const lExistedUser = await Users.findOne({ email });

    if (!lExistedUser) {
      inRes.status(StatusCode.BadRequest).send({ msg: `There is no user on email: ${email}` });
      return;
    }

    const lIsPasswordValid = await isPasswordMatch(password as string, lExistedUser.password);

    if (!lIsPasswordValid) {
      inRes.status(StatusCode.BadRequest).send({ msg: 'Wrong Password' });
      return;
    }

    const lAccessTokenTTL = randomNumberFromInterval(30, 60);
    const lAccessToken = generateAccessToken({ email }, lAccessTokenTTL);
    const lRefreshToken = jwt.sign({ email }, process.env.SECRET_TOKEN_REFRESH as string);

    await Tokens.insertOne({
      token: lRefreshToken
    });

    inRes.status(StatusCode.Ok).send({
      accessToken: lAccessToken,
      refreshToken: lRefreshToken
    });
  } catch (e) {
    inRes
      .status(StatusCode.InternalServerError)
      .send({ msg: 'A problem occurred on trying to access user data attempt', error: e });
  }
};

export const refreshToken = async (inReq: Request, inRes: Response): Promise<void> => {
  const lRefreshToken = inReq.header('Authorization');

  if (!lRefreshToken) {
    inRes.status(StatusCode.Forbidden).send({ msg: 'Refresh token is required' });
    return;
  }

  const lToken = lRefreshToken!.split(' ')[1];

  try {
    const lFoundTokenObj = await Tokens.findOne({ token: lToken });

    if (!lFoundTokenObj) {
      inRes.status(StatusCode.Forbidden).send({ message: 'Refresh token has not been found in the database' });
      return;
    }

    verifyAccessToken(lFoundTokenObj!.token, inRes, process.env.SECRET_TOKEN_REFRESH as string, (inUserEmail) => {
      const lNewAccessToken = generateAccessToken({ email: inUserEmail }, '1h');

      inRes.status(StatusCode.Ok).send({
        accessToken: lNewAccessToken
      });
    });
  } catch (e) {
    inRes.status(StatusCode.InternalServerError).send({ message: 'Problem occurred with refresh token' });
  }
};
