import { mkdir, writeFile } from 'fs/promises';
import { collectionWithIds, getCollectionPath, isEntityExist } from '../utils';

export const createDB = async <T>(inDbPath: string, inContent: T): Promise<void> => {
  try {
    const lIsCollectionExist = await isEntityExist(inDbPath);

    if (!lIsCollectionExist) {
      await mkdir(inDbPath, { recursive: true });
    }
    await writeFile(getCollectionPath(inDbPath), contentToStore(inContent));
  } catch (e) {
    throw e;
  }
};

const contentToStore = <T>(inReqBody: T): string => {
  const lContentCollection = Array.isArray(inReqBody) ? inReqBody : [inReqBody];
  return JSON.stringify(collectionWithIds(lContentCollection), null, 2);
};
