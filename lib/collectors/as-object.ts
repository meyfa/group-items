import { Grouping } from '../types'

export type ObjectCollection<K extends string | number | symbol, V> = Record<K, V[]>

/**
 * Convert the grouping to an object mapping.
 *
 * @returns The resulting object.
 */
export type ObjectCollector<K, V> = K extends string | number | symbol ? () => ObjectCollection<K, V> : () => ObjectCollection<string | number | symbol, V>

/**
 * Create an ObjectCollector for the given grouping.
 *
 * @param groups The grouping.
 * @returns The created collector.
 */
export function asObjectFactory<K, V> (groups: Grouping<K, V>): ObjectCollector<K, V> {
  return () => {
    const obj: ObjectCollection<string | number | symbol, V> = {}
    for (const group of groups) {
      if (typeof group.key === 'string' || typeof group.key === 'number' || typeof group.key === 'symbol') {
        obj[group.key] = group.items
      }
    }
    return obj
  }
}
