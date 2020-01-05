"use strict";

/**
 * Convert the grouping to an array of entry objects.
 *
 * Options:
 * - keyName: name of `key` property in resulting objects
 * - itemsName: name of `items` property in resulting objects
 *
 * @param {Object[]} groups The grouping.
 * @param {Object} options Collector options.
 * @return {Object[]} The resulting array.
 */
function asEntries(groups, options) {
    const keyName = options && options.keyName || "key";
    const itemsName = options && options.itemsName || "items";

    const entries = [];
    for (const group of groups) {
        entries.push({
            [keyName]: group.key,
            [itemsName]: group.items,
        });
    }
    return entries;
}

module.exports = asEntries;
