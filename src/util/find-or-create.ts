/**
 * Find the array entry matching the given predicate. If none match, create a
 * default entry and push it into the array. In either case, the entry will be
 * returned.
 *
 * The predicate receives one parameter: the entry.
 *
 * THIS MODIFIES THE ARRAY.
 *
 * @param arr The array to search.
 * @param predicate The search condition.
 * @param construct The creator function.
 * @returns The entry that was found, or created.
 */
export function findOrCreate<T> (arr: T[], predicate: (t: T) => boolean, construct: () => T): T {
  const index = arr.findIndex((entry) => predicate(entry))
  if (index >= 0) {
    return arr[index]
  }
  const newEntry = construct()
  arr.push(newEntry)
  return newEntry
}
