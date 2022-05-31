import { getPercentage } from '../../../shared';
import { DOCUMENT_PRICE_LANGUAGE } from '../../config';
import { DocumentLanguage } from '../../types';

export const getPrice = (inCharsCount: number, inLang: DocumentLanguage, isSupportedExt: boolean): number => {
  const { pricePerChar, minPrice } = DOCUMENT_PRICE_LANGUAGE[inLang];
  const lPrice = inCharsCount * pricePerChar;
  const lPricePercent = getPercentage(20, lPrice);
  const lResultPlusBonus = lPrice + (isSupportedExt ? 0 : lPricePercent);
  const lFinalPrice = Number(lResultPlusBonus.toFixed(2));

  return lFinalPrice < minPrice ? minPrice : lFinalPrice;
};
