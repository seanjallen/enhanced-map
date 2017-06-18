/**
 * @param {*} key
 * @returns {boolean} - Whether or not this object is a javascript wrapper object wrapping a primitive type.
 */
function isWrapperObject(key) {
  const wrapperTypes = [String, Boolean, Number];
  return wrapperTypes.some(wrapperType => key instanceof wrapperType);
}

/**
 * Default normalize keys function used by the library. It normalizes keys that are passed to the various
 * map methods to avoid common errors when using javascript maps.
 * @param {*} key
 * @returns {*} - A normalized version of the given key.
 */
export function normalizeKeys(key) {
  return isWrapperObject(key) ? key.valueOf() : key;
}
