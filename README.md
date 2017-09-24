# Enhanced Map

Subclass of the native [javascript map object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
Extended to make some common use cases easier (default values for unknown keys and normalizing conceptually equivalent keys to the same value).

## Usage

The interface is identical to native javascript maps except for the constructor:

```javascript
const EnhancedMap = require('enhanced-map').Map;
const options = {
  data: someIterableData,
  default: 2,
  normalizeKeys: myKeyNormalizingFunction,
};
const myMap = new EnhancedMap(options);
```

## Constructor Options

* **data** (type: [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterables), default: null)

  The data to initialize the map with, if any. The same argument you would pass to the [native map constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
  
* **default** (type: any, default: undefined)

  If given, this value will be returned from [Map.get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) whenever the given key is not in the map.
  
* **normalizeKeys** (type boolean|function(any):any, default: function)

  This option can be used to normalize multiple different keys to the same value. See [normalizing keys section](#normalizing-keys) below for more details.
    
## <a name="normalizing-keys"></a>Normalizing Keys

### Motivation

When using a map, it's not uncommon to have input coming from multiple sources that needs to be normalized so all code is querying the map with equivalent input. For example, trim whitespace on all string keys. Rather than have to explicitly call that normalization code throughout the codebase before touching the map, in an enhanced map [Map.get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get), [Map.has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has), and [Map.set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) will all call the given normalizeKeys function before processing the key in the map.

### Default Implementation

In a native map an equivalent [primitive wrapper object](https://developer.mozilla.org/en-US/docs/Glossary/Primitive#Primitive_wrapper_objects_in_JavaScript) and primitive type value would result in two different key/value pairs in the map, which is likely a subtle error. For example:

```javascript
const map = new Map(); // Native javascript map
const hello = new String('hello');
map.set(hello, false);
map.set(new String('hello'), true);
map.get(hello); // => false
map.get('hello'); // => undefined
```

By default, enhanced maps will normalize primitive wrapper objects to their corresponding primitive values, so the above example will have what is likely to be the intended outcome:

```javascript
const EnhancedMap = require('enhanced-map').Map;
const myMap = new EnhancedMap();
const hello = new String('hello');
myMap.set(hello, false);
myMap.set(new String('hello'), true);
myMap.get(hello); // => true
myMap.get('hello'); // => true
```

### Custom normalizeKeys function

Example:

```javascript
const EnhancedMap = require('enhanced-map').Map;
const options = {
  normalizeKeys: function(key) {
    if (key === 'hi') {
      return 'hello';
    } else {
      return key;
    }
  },
};
const myMap = new EnhancedMap(options);

myMap.set('hi', 2);
myMap.get('hello'); // => 2
myMap.has('hello'); // => true
myMap.set('hello', 7);
myMap.get('hi'); // => 7
myMap.size // => 1
```

If you want to wrap or extend the default normalization function, you can import it to get a handle on it:

```javascript
const EnhancedMap = require('enhanced-map').Map;
const defaultNormalizeKeys = require('enhanced-map').normalizeKeys;
const options = {
  normalizeKeys: function(key) {
    const normalizedKey = defaultNormalizeKeys(key);
    if (normalizedKey === 'hi') {
      return 'hello';
    } else {
      return normalizedKey;
    }
  },
};
const myMap = new EnhancedMap(options);
```

Pass `false` instead of a function if you want to turn off key normalization:

```javascript
const EnhancedMap = require('enhanced-map').Map;
const myMap = new EnhancedMap({ normalizeKeys: false });
```
