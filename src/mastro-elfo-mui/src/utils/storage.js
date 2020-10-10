/**
 * Adds read/write json functions to LocalStorage and SessionStorage.
 *
 * Just require once.
 */

/**
 * Gets a `key` from LocalStorage or SessionStorage and returns its value parsed as JSON.
 * @param  {string} key          Storage key
 * @param  {any} defaultValue   Default value if key is not found
 * @return {any}                Parsed JSON value
 */
Storage.prototype.getJson = function(key, defaultValue) {
  try {
    return JSON.parse(this.getItem(key)) || defaultValue;
  } catch (e) {
    if (e instanceof SyntaxError) {
      return defaultValue;
    }
    throw e;
  }
};

/**
 * Stringify `value` and stores it in LocalStorage or SessionStorage
 * @param  {Number|String} key   The key
 * @param  {any} value Anything that can be converted to JSON string
 */
Storage.prototype.setJson = function(key, value) {
  this.setItem(key, JSON.stringify(value));
};
