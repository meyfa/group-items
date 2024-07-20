import { Grouping, GroupingEntry } from '../types.js'

/**
 * Options for collecting grouped items as entries.
 */
export interface EntriesCollectorOptions {
  keyName?: string
  itemsName?: string
}

export type EntriesCollection<K, V> = Array<{ key: K, items: V[] }>

// This below is the most precise typing I could come up with.
// It detects whether options are either not supplied at all or match the default options, in which case
// the standard { key, items } entries are used; in all other cases, the property names cannot be deduced
// and we have unfortunately to fall back to Record.
// Note also that empty options objects cannot be detected at all and result in a Record as well.
//
// Yes, this is quite insufficient. If you can come up with anything better please contribute!

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
export type EntriesCollector<K, V> = <Opt extends { keyName: 'key', itemsName: 'items' } | EntriesCollectorOptions | undefined | null = undefined> (options?: Opt) =>
Opt extends undefined | null | { keyName: 'key', itemsName: 'items' } | { itemsName: 'items' } | { keyName: 'key' }
  ? EntriesCollection<K, V>
  : Array<Record<string, K | V[]>>

/**
 * Create an EntriesCollector for the given grouping.
 *
 * @param groups The grouping.
 * @returns The created collector.
 */
export function asEntriesFactory<K, V> (groups: Grouping<K, V>): EntriesCollector<K, V> {
  return ((options) => {
    const keyName: string = options?.keyName ?? 'key'
    const itemsName: string = options?.itemsName ?? 'items'

    return groups.map((g: GroupingEntry<K, V>) => ({
      [keyName]: g.key,
      [itemsName]: g.items
    }))
  }) as EntriesCollector<K, V>
}
