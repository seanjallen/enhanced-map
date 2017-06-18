/**
 * Certain environments do not allow extending the Map class using ES5 syntax because the Map class uses native code. Rather
 * than extend Map directly in ES5, this class is used as the parent class of EnhancedMap instead. It creates and holds a
 * map instance variable and dynamically defines its own interface to match that of the map. All of its properties proxy
 * the corresponding map property.
 */
class ES5MapProxy {

  constructor(iterable) {
    this.map = new Map(iterable);
  }

}

/**
 * @returns Array<String|Symbol>
 */
function getAllMapPropertiesToOverride() {
  const properties = Object.getOwnPropertyNames(Map.prototype).filter(name => name !== 'constructor');
  if (Symbol && Symbol.iterator && Map.prototype[Symbol.iterator]) {
    properties.push(Symbol.iterator);
  }
  return properties;
}

/**
 * @param {String|Symbol} property
 */
function overrideMapProperty(property) {
  const mapPropertyDescriptor = Object.getOwnPropertyDescriptor(Map.prototype, property);
  const proxyPropertyDescriptor = {
    configurable: mapPropertyDescriptor.configurable || true,
    enumerable: mapPropertyDescriptor.enumerable || false,
  };
  if (mapPropertyDescriptor.hasOwnProperty('writable')) {
    proxyPropertyDescriptor.writable = mapPropertyDescriptor.writable;
  }
  if (mapPropertyDescriptor.hasOwnProperty('value')) {
    proxyPropertyDescriptor.value = function() {
      return typeof(mapPropertyDescriptor.value) === 'function' ? this.map[property].apply(this.map, arguments) : this.map[property];
    }
  }
  if (mapPropertyDescriptor.set) {
    proxyPropertyDescriptor.set = function(value) {
      return this.map[property] = value;
    }
  }
  if (mapPropertyDescriptor.get) {
    proxyPropertyDescriptor.get = function() {
      return this.map[property];
    }
  }
  Object.defineProperty(ES5MapProxy.prototype, property, proxyPropertyDescriptor);
}

getAllMapPropertiesToOverride().forEach(property => overrideMapProperty(property));

export { ES5MapProxy };
