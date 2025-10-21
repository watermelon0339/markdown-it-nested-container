/**
 * test whether test string is `class name` or not.
 *
 * @param {string} test test string.
 * @returns {boolean} whether test string is `class name` or not.
 */
function isClassName(test) {
    if (typeof test !== 'string') return false;
    const classNameFound = /^[A-Za-z0-9]+(-?[A-Za-z0-9]+)*$/.exec(test);
    return classNameFound != null;
}

/**
 * Enabled to extention of primitive objects
 */
function usePrimitiveExtention() {
    Object.defineProperty(Array.prototype, "satisfy", {
        writable: true,
        enumerable: false,
        configurable: true,
        value: function(test) {
            return this.every(condition => condition(test));
        }
    })
    // Array.prototype.satisfy = function(test) {
    //     return this.every(condition => condition(test));
    // };

    Object.defineProperty(Object.prototype, "satisfyAll", {
        writable: true,
        enumerable: false,
        configurable: true,
        value: function(conditions) {
            return conditions.every(condition => condition(this));
        }
    })
    // Object.prototype.satisfyAll = function(conditions) {
    //     return conditions.every(condition => condition(this));
    // };

    Object.defineProperty(Object.prototype, "has", {
        writable: true,
        enumerable: false,
        configurable: true,
        value: function(propertyName) {
        return Object.keys(this).includes(propertyName) &&
            this[propertyName] !== undefined && this[propertyName] != null;
        }
    })
    // Object.prototype.has = function(propertyName) {
    //     return Object.keys(this).includes(propertyName) &&
    //         this[propertyName] !== undefined && this[propertyName] != null;
    // };

    Object.defineProperty(Array.prototype, "notToBeConflicted", {
        writable: true,
        enumerable: false,
        configurable: true,
        value: function(equals) {
        const safeEquals = equals || ((x, y) => x === y);
        return this.every(
            (item1) => this.filter((item2) => safeEquals(item1, item2)).length === 1);
        }
    })
    // Array.prototype.notToBeConflicted = function(equals) {
    //     const safeEquals = equals || ((x, y) => x === y);
    //     return this.every(
    //         (item1) => this.filter((item2) => safeEquals(item1, item2)).length === 1);
    // };
}
module.exports = {
    isClassName, usePrimitiveExtention
};
