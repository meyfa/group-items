/**
 * Find the array entry matching the given predicate. If none match, create a
 * default entry and push it into the array. In either case, the entry will be
 * returned.
 *
 * The predicate receives one parameter: the entry.
 *
 * THIS MODIFIES THE ARRAY.
 *
 * @param arr The map to search.
 * @param predicate The search condition.
 * @param construct The creator function.
 * @returns The entry that was found, or created.
 */
export function findOrCreate<K, V> (arr: Map<K, V>, predicate: K, construct: () => V): V {
  const value = arr.has(predicate)
  if (value) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return arr.get(predicate)!
  }
  const newEntry = construct()
  arr.set(predicate, newEntry)
  return newEntry
}
