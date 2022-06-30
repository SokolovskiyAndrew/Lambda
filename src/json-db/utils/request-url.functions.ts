import { Request } from 'express';
import path from 'path';
import url from 'url';
import { DATABASES_PATH } from '../config';

export const getUrlPath = (inReq: Request): string => {
  const { url: lUrlString } = inReq;
  return <string>url.parse(lUrlString).pathname;
};

export const getUrlPathList = (inUrlPath: string): string[] => {
  return inUrlPath.replace(/\//, '').split('/');
};

export const getFolderPath = (inReq: Request): string => {
  const lPathName = getUrlPath(inReq);
  const lPathNameSep = lPathName.replace(/\//g, path.sep);

  return `${DATABASES_PATH}${lPathNameSep}${path.sep}`;
};

export const getCollectionPath = (inPath: string): string => {
  const lCollectionName = inPath.split(path.sep).at(-2);
  const lExtension = '.json';

  return `${inPath}${path.sep}${lCollectionName}${lExtension}`;
};
