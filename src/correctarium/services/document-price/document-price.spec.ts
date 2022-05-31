import { getPrice } from './document-price';

describe('getPrice', () => {
  describe('Default Minimal Price', () => {
    it('should get min price for UA language if estimated less than minimal', () => {
      expect(getPrice(300, 'ua', true)).toEqual(50);
    });

    it('should get min price for EN language if estimated less than minimal', () => {
      expect(getPrice(300, 'en', true)).toEqual(120);
    });
  });

  describe('Price With Additional Percentage', () => {
    it('should get final price without percentage if doc supported type provided', () => {
      expect(getPrice(8600, 'ua', true)).toEqual(430);
    });

    it('should calculate price with percentage if not supported doc type provided', () => {
      expect(getPrice(8600, 'ua', false)).toEqual(516);
    });
  });
});
