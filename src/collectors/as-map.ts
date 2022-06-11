import { Grouping } from '../types'

export type MapCollection<K, V> = Map<K, V[]>

/**
 * Convert the grouping to a Map.
 *
 * @returns The resulting Map.
 */
export type MapCollector<K, V> = () => MapCollection<K, V>

/**
 * Create a MapCollector for the given grouping.
 *
 * @param groups The grouping.
 * @returns The created collector.
 */
export function asMapFactory<K, V> (groups: Grouping<K, V>): MapCollector<K, V> {
  return () => {
    const map = new Map()
    for (const group of groups) {
      map.set(group.key, group.items)
    }
    return map
  }
}
