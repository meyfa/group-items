import { Grouping, GroupingEntry } from '../types'

export interface EntriesCollectorOptions {
  keyName?: string
  itemsName?: string
}

// TODO find a way to strongly-type this
export type EntriesCollection<K, V> = Array<Record<string, K | V[]>>

/**
 * Convert the grouping to an array of entry objects.
 *
 * Options:
 * - keyName: name of `key` property in resulting objects
 * - itemsName: name of `items` property in resulting objects
 *
 * @param groups The grouping.
 * @param options Collector options.
 * @returns The resulting array.
 */
export function asEntries<K, V> (groups: Grouping<K, V>, options?: EntriesCollectorOptions): EntriesCollection<K, V> {
  const keyName = options?.keyName ?? 'key'
  const itemsName = options?.itemsName ?? 'items'

  return groups.map((g: GroupingEntry<K, V>) => ({
    [keyName]: g.key,
    [itemsName]: g.items
  }))
}
