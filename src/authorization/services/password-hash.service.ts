import crypto from 'crypto';
import { promisify } from 'util';

export const passwordCrypt = async (inPassword: string): Promise<string> => {
  const lSalt = crypto.randomBytes(16).toString('hex');

  const lHash = await createHash(inPassword, lSalt);

  return `${lHash}:${lSalt}`;
};

export const isPasswordMatch = async (inPassword: string, inHash: string): Promise<boolean> => {
  const [hash, salt] = inHash.split(':');
  const lHash = await createHash(inPassword, salt);

  return hash === lHash;
};

const createHash = async (inValue: string, inSalt: string): Promise<string> => {
  const lHashBuffer = (await promisify(crypto.scrypt)(inValue, inSalt, 32)) as Buffer;

  return lHashBuffer.toString('hex');
};
