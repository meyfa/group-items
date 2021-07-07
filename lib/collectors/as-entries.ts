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
 * @param options Collector options.
 * @returns The resulting array.
 */
export type EntriesCollector<K, V> = (options?: EntriesCollectorOptions) => EntriesCollection<K, V>

/**
 * Create an EntriesCollector for the given grouping.
 *
 * @param groups The grouping.
 * @returns The created collector.
 */
export function asEntriesFactory<K, V> (groups: Grouping<K, V>): EntriesCollector<K, V> {
  return (options?: EntriesCollectorOptions) => {
    const keyName = options?.keyName ?? 'key'
    const itemsName = options?.itemsName ?? 'items'

    return groups.map((g: GroupingEntry<K, V>) => ({
      [keyName]: g.key,
      [itemsName]: g.items
    }))
  }
}
