"use strict";

/**
 * Convert the grouping to an array of tuples.
 *
 * @param {Object[]} groups The grouping.
 * @return {Array[]} The resulting tuple array.
 */
function asTuples(groups) {
    const tuples = [];
    for (const group of groups) {
        tuples.push([group.key, group.items]);
    }
    return tuples;
}

module.exports = asTuples;
