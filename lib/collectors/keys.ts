import { Grouping } from '../types'

export type KeysCollection<K> = K[]

/**
 * Convert the grouping to an array of keys.
 *
 * @param groups The grouping.
 * @returns The resulting array.
 */
export function keys<K> (groups: Grouping<K, any>): KeysCollection<K> {
  return groups.map((g) => g.key)
}
