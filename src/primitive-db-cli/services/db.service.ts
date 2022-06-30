import { createReadStream } from 'fs';
import { appendFile } from 'fs/promises';
import path from 'path';
import { createInterface } from 'readline';
import { User } from '../interfaces';

const DB_PATH = `${path.resolve(__dirname, '..')}${path.sep}db${path.sep}users.collection.txt`;

export const addToDb = async (inUser: User): Promise<void> => {
  const lUserToSave = JSON.stringify(inUser) + '\r\n';

  try {
    await appendFile(DB_PATH, lUserToSave);
  } catch (e) {
    console.log('Failed while trying to save a user');
  }
};

export const getItemFromDb = async (inUserName: string): Promise<User | undefined> => {
  const lItemsList = await getItemList();
  return lItemsList.find(({ name }) => name === inUserName);
};

export const getItemList = async (): Promise<User[]> => {
  return new Promise((inResolve) => {
    const lReadStream = createReadStream(DB_PATH, { encoding: 'utf-8' });
    const lReadLine = createInterface({ input: lReadStream });
    const lItemsList: User[] = [];

    lReadLine.on('line', (inLine: string) => {
      lItemsList.push(JSON.parse(inLine));
    });

    lReadLine.on('close', () => inResolve(lItemsList));
  });
};
