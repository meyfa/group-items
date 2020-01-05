"use strict";

// MAIN EXPORT

/**
 * Find the array entry matching the given predicate. If none match, create a
 * default entry and push it into the array. In either case, the entry will be
 * returned.
 *
 * The predicate receives one parameters: the entry.
 *
 * THIS MODIFIES THE ARRAY.
 *
 * @param {*[]} arr The array to search.
 * @param {Function} predicate The search condition.
 * @param {Function} construct The creator function.
 * @return {*} The entry that was found, or created.
 */
function findOrCreate(arr, predicate, construct) {
    const index = arr.findIndex((entry) => predicate(entry));
    if (index >= 0) {
        return arr[index];
    }
    const newEntry = construct();
    arr.push(newEntry);
    return newEntry;
}

module.exports = findOrCreate;
