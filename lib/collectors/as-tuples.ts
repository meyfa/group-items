import { Grouping } from '../types'

export type TuplesCollection<K, V> = Array<[K, V[]]>

/**
 * Convert the grouping to an array of tuples.
 *
 * @returns The resulting tuple array.
 */
export type TuplesCollector<K, V> = () => TuplesCollection<K, V>

/**
 * Create a TuplesCollector for the given grouping.
 *
 * @param groups The grouping.
 * @returns The created collector.
 */
export function asTuplesFactory<K, V> (groups: Grouping<K, V>): TuplesCollector<K, V> {
  return () => {
    return groups.map((g) => [g.key, g.items])
  }
}
