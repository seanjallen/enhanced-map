import { ES5MapProxy } from '../src/ES5MapProxy';

let testMap;
const testKey = 'test';
const testValue = 1;
let testMapProxy;

describe('ES5MapProxy', () => {
  beforeEach(() => {
    testMap = new Map();
    testMap.set(testKey, testValue);
    testMapProxy = new ES5MapProxy(testMap);
  });
  test('defines clear method', () => {
    expect(testMapProxy.size).toBe(1);
    testMapProxy.clear();
    expect(testMapProxy.size).toBe(0);
  });
  test('defines delete method', () => {
    expect(testMapProxy.size).toBe(1);
    testMapProxy.delete(testKey);
    expect(testMapProxy.size).toBe(0);
  });
  test('defines entries method', () => {
    for (let entry of testMapProxy.entries()) {
      expect(entry[0]).toBe(testKey);
      expect(entry[1]).toBe(testValue);
    }
  });
  test('defines forEach method', () => {
    testMapProxy.forEach((value, key) => {
      expect(value).toBe(testValue);
      expect(key).toBe(testKey);
    });
  });
  test('defines get method', () => {
    expect(testMapProxy.get(testKey)).toBe(testValue);
  });
  test('defines has method', () => {
    expect(testMapProxy.has(testKey)).toBe(true);
  });
  test('defines keys method', () => {
    for (let key of testMapProxy.keys()) {
      expect(key).toBe(testKey);
    }
  });
  test('defines set method', () => {
    const newValue = testValue + 1;
    testMapProxy.set(testKey, newValue);
    expect(testMapProxy.get(testKey)).toBe(newValue);
  });
  test('defines values method', () => {
    for (let value of testMapProxy.values()) {
      expect(value).toBe(testValue);
    }
  });
  test('defines iterator symbol', () => {
    for (let entry of testMapProxy) {
      expect(entry[0]).toBe(testKey);
      expect(entry[1]).toBe(testValue);
    }
  });
  test('defines size getter', () => {
    expect(testMap.size).toBe(1);
    testMap.set(testKey.substr(1), testValue);
    expect(testMap.size).toBe(2);
  });
});
