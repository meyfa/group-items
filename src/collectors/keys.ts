import { Grouping } from '../types.js'

export type KeysCollection<K> = K[]

/**
 * Convert the grouping to an array of keys.
 *
 * @returns The resulting array.
 */
export type KeysCollector<K> = () => KeysCollection<K>

/**
 * Create a TuplesCollector for the given grouping.
 *
 * @param groups The grouping.
 * @returns The created collector.
 */
export function keysFactory<K, V> (groups: Grouping<K, V>): KeysCollector<K> {
  return () => {
    return groups.map((g) => g.key)
  }
}
