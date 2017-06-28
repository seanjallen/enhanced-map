import { normalizeKeys } from '../src/normalizeKeys';

describe('normalizeKeys', () => {
  describe('normalizes wrapper objects to their underlying values', () => {
    test('normalizes symbol wrappers', () => {
      const testSymbol = Symbol('test');
      const wrapper = Object(testSymbol);
      expect(normalizeKeys(wrapper)).toBe(testSymbol);
    });
    test('normalizes number wrappers', () => {
      const testNumber = 2;
      const wrapper = new Number(2);
      expect(normalizeKeys(wrapper)).toBe(testNumber);
    });
    test('normalizes boolean wrappers', () => {
      const testBoolean = true;
      const wrapper = new Boolean(true);
      expect(normalizeKeys(wrapper)).toBe(testBoolean);
    });
    test('normalizes string wrappers', () => {
      const testString = 'test';
      const wrapper = new String('test');
      expect(normalizeKeys(wrapper)).toBe(testString);
    });
  });
  describe('does not normalize keys that are not primitive wrapper objects that are not equal', () => {
    test('does not normalize unequal symbols', () => {
      expect(normalizeKeys(Symbol('test'))).not.toBe(normalizeKeys(Symbol('test')));
    });
    test('does not normalize unequal numbers', () => {
      expect(normalizeKeys(1)).not.toBe(normalizeKeys(2));
    });
    test('does not normalize unequal booleans', () => {
      expect(normalizeKeys(false)).not.toBe(normalizeKeys(true));
    });
    test('does not normalize unequal strings', () => {
      expect(normalizeKeys('a')).not.toBe(normalizeKeys('b'));
    });
    test('does not normalize regular objects', () => {
      expect(normalizeKeys({})).not.toBe(normalizeKeys({}));
    });
  });
  test('normalizes equal primitive types to the same value', () => {
    const testSymbol = Symbol('test');
    const testNumber = 1;
    const testBoolean = false;
    const testString = 'test';
    expect(normalizeKeys(testSymbol)).toBe(normalizeKeys(testSymbol));
    expect(normalizeKeys(testNumber)).toBe(normalizeKeys(testNumber));
    expect(normalizeKeys(testBoolean)).toBe(normalizeKeys(testBoolean));
    expect(normalizeKeys(testString)).toBe(normalizeKeys(testString));
  });
  test('returns undefined for undefined', () => {
    expect(normalizeKeys(undefined)).toBeUndefined();
    expect(normalizeKeys()).toBeUndefined();
  });
  test('returns null for null', () => {
    expect(normalizeKeys(null)).toBeNull();
  });
});
