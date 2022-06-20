import { Request, Response } from 'express';
import { StatusCode } from '../enums';

export const userMe = async (inReq: Request, inRes: Response): Promise<void> => {
  const { email } = inReq.body;
  const { url } = inReq;
  const lUrlNumber = url[url.length - 1];

  inRes.status(StatusCode.Ok).send({
    request_num: lUrlNumber,
    data: {
      userName: email
    }
  });
};
