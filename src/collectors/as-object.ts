import type { Grouping } from '../types.js'

/**
 * Determine whether the given key can be used to specify an object property. This is true if, and only if,
 * it is of type string, number or symbol.
 *
 * @param key The key.
 * @returns Whether the key is of a valid type.
 */
function isObjectAssignable<K> (key: K): key is Extract<K, keyof any> {
  return typeof key === 'string' || typeof key === 'number' || typeof key === 'symbol'
}

export type ObjectCollection<K extends keyof any, V> = Record<K, V[]>

/**
 * Convert the grouping to an object mapping.
 *
 * @returns The resulting object.
 */
export type ObjectCollector<K, V> = () => ObjectCollection<Extract<K, keyof any>, V>

/**
 * Create an ObjectCollector for the given grouping.
 *
 * @param groups The grouping.
 * @returns The created collector.
 */
export function asObjectFactory<K, V> (groups: Grouping<K, V>): ObjectCollector<K, V> {
  return () => {
    const obj = {} as ObjectCollection<Extract<K, keyof any>, V>
    for (const group of groups) {
      if (isObjectAssignable(group.key)) {
        obj[group.key] = group.items
      }
    }
    return obj
  }
}
