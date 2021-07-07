import { Grouping } from '../types'

export type TuplesCollection<K, V> = Array<[K, V[]]>

/**
 * Convert the grouping to an array of tuples.
 *
 * @param groups The grouping.
 * @returns The resulting tuple array.
 */
export function asTuples<K, V> (groups: Grouping<K, V>): TuplesCollection<K, V> {
  return groups.map((g) => [g.key, g.items])
}
