import { Grouping } from '../types'

export type MapCollection<K, V> = Map<K, V[]>

/**
 * Convert the grouping to a Map.
 *
 * @param groups The grouping.
 * @returns The resulting map.
 */
export function asMap<K, V> (groups: Grouping<K, V>): MapCollection<K, V> {
  const map = new Map()
  for (const group of groups) {
    map.set(group.key, group.items)
  }
  return map
}
