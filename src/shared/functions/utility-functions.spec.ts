import 'jest';
import * as utility from './utility-funtions';

describe('utility-functions', () => {
  describe('getHashTable', () => {
    it('should return dictionary with keys and zeros as values', () => {
      expect(utility.getHashTable(['please', 'go', 'ahead'])).toEqual({
        please: 0,
        go: 0,
        ahead: 0
      });
    });

    it('should return an empty object if empty array was provided', () => {
      expect(utility.getHashTable([])).toEqual({});
    });
  });

  describe('isNil', () => {
    it('should return true if provided parameter is null', () => {
      expect(utility.isNil(null)).toBeTruthy();
    });

    it('should return true if provided parameter is undefined', () => {
      expect(utility.isNil(undefined)).toBeTruthy();
    });

    it('should return false if provided parameter is an empty string', () => {
      expect(utility.isNil('')).toBeFalsy();
    });

    it('should return false if provided parameter is an object', () => {
      expect(utility.isNil({ name: 'test' })).toBeFalsy();
    });
  });

  describe('isObject', () => {
    it('should return true if provided parameter is an object', () => {
      expect(utility.isObject({ name: 'test' })).toBeTruthy();
    });

    it('should return false if provided parameter is an array', () => {
      expect(utility.isObject([{ name: 'test' }])).toBeFalsy();
    });

    it('should return false if provided parameter is null', () => {
      expect(utility.isObject(null)).toBeFalsy();
    });
  });

  describe('objectKeyDeepSearch', () => {
    it('should return look-up property value if it exists on the first level of object', () => {
      expect(
        utility.objectKeyDeepSearch(
          {
            name: 'test'
          },
          'name'
        )
      ).toEqual('test');
    });

    it('should return look-up property value if it exists on any level of object nested property', () => {
      expect(
        utility.objectKeyDeepSearch(
          {
            info: {
              address: {
                city: 'London',
                home: {
                  street: 'London street'
                }
              }
            }
          },
          'street' as any
        )
      ).toEqual('London street');
    });

    it('should return null if a look-up property does not exists on any level of object nested property', () => {
      expect(
        utility.objectKeyDeepSearch(
          {
            info: {
              address: {
                city: 'London',
                home: {
                  street: 'London street'
                }
              }
            }
          },
          'name' as any
        )
      ).toBeNull();
    });
  });
});
