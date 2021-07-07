import { Grouping } from '../types'

export type ObjectCollection<K extends string | number | symbol, V> = Record<K, V[]>

/**
 * Convert the grouping to an object mapping.
 *
 * @param groups The grouping.
 * @returns The resulting object.
 */
export function asObject<K extends string | number | symbol, V> (groups: Grouping<K, V>): ObjectCollection<K, V> {
  // @ts-expect-error
  const obj: ObjectCollection<K, V> = {}
  for (const group of groups) {
    obj[group.key] = group.items
  }
  return obj
}
