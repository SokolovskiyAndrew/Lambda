import { DocumentLanguage, FileExtension } from '../types';

export interface DocumentInfo {
  language: DocumentLanguage;
  mimetype: FileExtension;
  count: number;
}
