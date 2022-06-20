import { access } from 'fs/promises';

export const isEntityExist = async (inPath: string): Promise<boolean> => {
  try {
    await access(inPath);
    return true;
  } catch {
    return false;
  }
};

export const collectionWithIds = <T>(inCollection: T[]): T[] => {
  return inCollection.map((inDocument, index) => {
    const lIdKey = 'id';
    const lIdKeyUnderscore = '_id';
    if (!(lIdKey in inDocument) || lIdKeyUnderscore in inDocument) {
      return {
        id: index,
        ...inDocument
      };
    }

    return inDocument;
  });
};
