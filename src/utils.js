/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
 * @returns {boolean} - Whether or not the currently running javascript environment supports the symbol type.
 */
export function environmentSupportsSymbols() {
  try {
    return !!Symbol;
  } catch(e) {
    return false;
  }
}
