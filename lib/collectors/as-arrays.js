"use strict";

/**
 * Convert the grouping to an array of arrays.
 *
 * @param {Object[]} groups The grouping.
 * @return {Array[]} The resulting array.
 */
function asArrays(groups) {
    const arrays = [];
    for (const group of groups) {
        arrays.push(group.items);
    }
    return arrays;
}

module.exports = asArrays;
