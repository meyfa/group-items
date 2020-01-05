"use strict";

const deepEql = require("deep-eql");

const findOrCreate = require("./util/find-or-create");

const asArrays = require("./collectors/as-arrays");
const asEntries = require("./collectors/as-entries");
const asMap = require("./collectors/as-map");
const asObject = require("./collectors/as-object");
const asTuples = require("./collectors/as-tuples");
const keys = require("./collectors/keys");


// UTILITY METHODS

/**
 * Create a grouping of the items with the given keying function.
 *
 * The keying function receives a single argument - the item - and must return
 * the key to be used for that item.
 *
 * The result of this method is an array of objects containing:
 * - key: the common key value of the items in this group
 * - items: array of items in this group
 *
 * @param {Iterable} items Item iterable.
 * @param {Function} keyFn Keying function.
 * @return {Object[]} Array of groups.
 */
function createGrouping(items, keyFn) {
    const groups = [];
    for (const item of items) {
        const itemKey = keyFn(item);

        const predicate = (g) => deepEql(g.key, itemKey);
        const construct = () => ({ key: itemKey, items: [] });
        findOrCreate(groups, predicate, construct).items.push(item);
    }
    return groups;
}


// MAIN EXPORT

/**
 * Start a grouping over the given items.
 *
 * @param {Iterable} items Some collection of items.
 * @return {Object} A groupable object.
 */
function group(items) {
    /**
     * Group the items with the given key, which can be either a property name
     * or a custom function.
     *
     * The argument of the keying function is the item. Its return value is used
     * as the group key for that item.
     *
     * @param {String|Function} key The keying function or property name.
     * @return {Object} A collectable object.
     */
    const by = (key) => {
        // create grouping with resolved keying function
        const keyFn = typeof key === "function" ? key : (item) => item[key];
        const groups = createGrouping(items, keyFn);

        // return collectors
        return Object.freeze({
            asArrays: asArrays.bind(null, groups),
            asEntries: asEntries.bind(null, groups),
            asMap: asMap.bind(null, groups),
            asObject: asObject.bind(null, groups),
            asTuples: asTuples.bind(null, groups),
            keys: keys.bind(null, groups),
        });
    };

    return Object.freeze({ by });
}

module.exports = group;
