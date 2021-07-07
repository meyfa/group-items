import { Grouping } from '../types'

export type ArraysCollection<V> = V[][]

/**
 * Convert the grouping to an array of arrays.
 *
 * @param groups The grouping.
 * @returns The resulting array.
 */
export function asArrays<K, V> (groups: Grouping<K, V>): ArraysCollection<V> {
  return groups.map((g) => g.items)
}
