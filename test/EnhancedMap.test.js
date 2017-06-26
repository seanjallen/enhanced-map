jest.mock('../src/normalizeKeys');
import { EnhancedMap } from '../src/EnhancedMap';
import { normalizeKeys } from '../src/normalizeKeys';

describe('EnhancedMap', () => {
  describe('constructor', () => {
    test('creates a new map successfully with no options', () => {
      const map = new EnhancedMap();
      expect(map).toBeDefined();
      expect(map.size).toBe(0);
    });
    test('passes the given data option to the underlying map', () => {
      const data = new Map();
      data.set('key1', 1);
      data.set('key2', 2);
      const map = new EnhancedMap({ data });
      expect(map.size).toBe(data.size);
      data.forEach((value, key) => expect(map.get(key)).toBe(value));
    });
  });
  describe('normalizeKeys', () => {
    test('defaults to the built in normalize keys function', () => {
      normalizeKeys.mockClear();
      const map = new EnhancedMap();
      map.normalizeKey('test');
      expect(normalizeKeys).toHaveBeenCalled();
    });
    test('uses a new normalize key function if given', () => {
      const normalizeKeysFunc = jest.fn();
      const map = new EnhancedMap({ normalizeKeys: normalizeKeysFunc });
      map.normalizeKey('test');
      expect(normalizeKeysFunc).toHaveBeenCalled();
    });
    test('does no normalization if normalizeKeys options is set to false', () => {
      normalizeKeys.mockClear();
      const map = new EnhancedMap({ normalizeKeys: false });
      map.normalizeKey('test');
      expect(normalizeKeys).not.toHaveBeenCalled();
    });
  });
  describe('get', () => {
    test('returns default value for unknown key if default option was given to map', () => {
      const defaultValue = 5;
      const map = new EnhancedMap({ default: defaultValue });
      expect(map.get('test')).toBe(defaultValue);
    });
    test('returns undefined for unknown key if no default option was given to map', () => {
      const map = new EnhancedMap();
      expect(map.get('test')).toBeUndefined();
    });
    test('returns the same value for two normalized keys', () => {
      const map = new EnhancedMap({ normalizeKeys: () => 'normalized-key' });
      const value = 2;
      map.set('test', value);
      expect(map.get('test2')).toBe(value);
    });
    test('returns different values for keys that aren\'t normalized together', () => {
      const map = new EnhancedMap({ normalizeKeys: (key) => key });
      map.set('test', 1);
      expect(map.get('test2')).toBeUndefined();
    });
  });
  describe('has', () => {
    test('returns true if there is a value for the key after normalization', () => {
      const map = new EnhancedMap({ normalizeKeys: () => 'normalized-key' });
      map.set('test', 2);
      expect(map.has('test2')).toBeTruthy();
    });
    test('returns false if there is no value for the key after normalization', () => {
      const map = new EnhancedMap({ normalizeKeys: (key) => key });
      map.set('test', 2);
      expect(map.has('test2')).not.toBeTruthy();
    });
  })
  describe('set', () => {
    test('stores all keys that are normalized together with the same entry in the map', () => {
      const map = new EnhancedMap({ normalizeKeys: () => 'normalized-key' });
      map.set('test', 1);
      map.set('test2', 2);
      expect(map.size).toBe(1);
    });
    test('stores keys that are not normalized together with different entries in the map', () => {
      const map = new EnhancedMap({ normalizeKeys: (key) => key });
      map.set('test', 1);
      map.set('test2', 2);
      expect(map.size).toBe(2);
    });
  });
});
