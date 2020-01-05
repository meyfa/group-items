"use strict";

/**
 * Convert the grouping to an object mapping.
 *
 * @param {Object[]} groups The grouping.
 * @return {Object} The resulting object.
 */
function asObject(groups) {
    const obj = {};
    for (const group of groups) {
        obj[group.key] = group.items;
    }
    return obj;
}

module.exports = asObject;
