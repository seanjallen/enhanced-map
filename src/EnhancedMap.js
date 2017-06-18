import { normalizeKeys } from './normalizeKeys';
import { ES5MapProxy } from './ES5MapProxy';

export class EnhancedMap extends ES5MapProxy {

  /**
   * @param {iterable} [options.data] - An array or other iterable object whose elements are key/value pairs, see map constructor
   * documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
   * @param {*} [options.default] - Value that should be returned when calling "get" for a key that does not exist, if no
   * default is given "get" will return what it normally does for keys that are not set (undefined).
   * @param {function(key: *): *|boolean} [options.normalizeKeys] - Function that should be used to normalize keys when querying/manipulating
   * the values in the map. If not given a function that normalizes for common javascript map key errors will be used by default, but it can
   * be overridden here for special behavior. Passing false for this option will cause no key normalization to be used.
   */
  constructor(options = {}) {
    const superParameters = options && options.data ? [options.data] : [];
    super(...superParameters);
    this.options = Object.assign({}, { normalizeKeys }, options);
  }

  /**
   * @override
   * @param key
   * @returns {*} - Returns the default value this map has been configured with (if any) if the key is not present in the map.
   */
  get(key) {
    const normalizedKey = this.normalizeKey(key);
    if (super.has(normalizedKey)) { // Optimization, calling "super.has" instead of our own has method so we don't wind up normalizing the key twice
      return super.get(normalizedKey);
    }
    return this.options.default;
  }

  /**
   * @override
   * @param {*} key
   * @returns {boolean}
   */
  has(key) {
    return super.has(this.normalizeKey(key));
  }

  /**
   * @override
   * @param {*} key
   * @param {*} value
   */
  set(key, value) {
    super.set(this.normalizeKey(key), value);
  }

  /**
   * @param {*} key
   * @returns {*} - The given map key, normalized according to the settings for this map.
   */
  normalizeKey(key) {
    return this.options.normalizeKeys ? this.options.normalizeKeys(key) : key;
  }

}