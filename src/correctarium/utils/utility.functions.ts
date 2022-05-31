import { Dictionary } from '../../shared';
import { SUPPORTED_FILE_TYPE_LIST, SUPPORTED_LANGUAGE_LIST } from '../config';
import { FileExtension, SupportedFileExtension } from '../types';

export const isSupportedDocumentType = (inDocType: FileExtension): inDocType is SupportedFileExtension => {
  return SUPPORTED_FILE_TYPE_LIST.includes(inDocType);
};

export const isSupportedLanguage = (inLang: string): boolean => {
  return SUPPORTED_LANGUAGE_LIST.includes(inLang);
};

export const getTimeStringFormatSlash = (inDate: Date): string => {
  const lCharReplacement: Dictionary<string> = { '.': '/', ',': '' };
  return inDate.toLocaleString().replace(/[.,]/g, (inCharToReplace) => {
    return lCharReplacement[inCharToReplace];
  });
};
