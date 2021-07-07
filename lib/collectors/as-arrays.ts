import { Grouping } from '../types'

export type ArraysCollection<V> = V[][]

/**
 * Convert the grouping to an array of arrays.
 *
 * @returns The resulting array.
 */
export type ArraysCollector<V> = () => ArraysCollection<V>

/**
 * Create an ArraysCollector for the given grouping.
 *
 * @param groups The grouping.
 * @returns The created collector.
 */
export function asArraysFactory<K, V> (groups: Grouping<K, V>): ArraysCollector<V> {
  return () => {
    return groups.map((g) => g.items)
  }
}
