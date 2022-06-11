import deepEql from 'deep-eql'

import { Grouping, GroupingEntry } from './types'
import { findOrCreate } from './util/find-or-create'
import { ArraysCollector, asArraysFactory } from './collectors/as-arrays'
import { asEntriesFactory, EntriesCollector } from './collectors/as-entries'
import { asMapFactory, MapCollector } from './collectors/as-map'
import { asObjectFactory, ObjectCollector } from './collectors/as-object'
import { asTuplesFactory, TuplesCollector } from './collectors/as-tuples'
import { KeysCollector, keysFactory } from './collectors/keys'

export type KeyingFunction<K, V> = (t: V) => K

/**
 * Group the items with the given key, which can be either a property name
 * or a custom function.
 *
 * The argument of the keying function is the item. Its return value is used
 * as the group key for that item.
 *
 * @param key The keying function or property name.
 * @returns A collectable object.
 */
export type GroupingFunction<V> = <K = any> (key: string | KeyingFunction<K, V>) => Collectable<K, V>

export interface Groupable<V> {
  readonly by: GroupingFunction<V>
}

export interface Collectable<K, V> {
  readonly asArrays: ArraysCollector<V>
  readonly asEntries: EntriesCollector<K, V>
  readonly asObject: ObjectCollector<K, V>
  readonly asMap: MapCollector<K, V>
  readonly asTuples: TuplesCollector<K, V>
  readonly keys: KeysCollector<K>
}

// UTILITY METHODS

/**
 * Create a grouping of the items with the given keying function.
 *
 * The keying function receives a single argument - the item - and must return
 * the key to be used for that item.
 *
 * The result of this method is an array of objects containing:
 * - key: the common key value of the items in this group
 * - items: array of items in this group
 *
 * @param items Item iterable.
 * @param keyFn Keying function.
 * @returns Array of groups.
 */
function createGrouping<K, V> (items: Iterable<V>, keyFn: KeyingFunction<K, V>): Grouping<K, V> {
  const groups: Grouping<K, V> = []
  for (const item of items) {
    const itemKey = keyFn(item)

    const predicate = (g: GroupingEntry<K, V>): boolean => deepEql(g.key, itemKey)
    const construct = (): GroupingEntry<K, V> => ({ key: itemKey, items: [] })
    findOrCreate(groups, predicate, construct).items.push(item)
  }
  return groups
}

// MAIN EXPORT

export function group (items: Iterable<never>): Groupable<any>

export function group<V> (items: Iterable<V>): Groupable<V>

/**
 * Start a grouping over the given items.
 *
 * @param items Some iterable collection of items.
 * @returns A groupable object.
 */
export function group<V> (items: Iterable<V>): Groupable<V> {
  const by: GroupingFunction<V> = (key) => {
    // create grouping with resolved keying function
    const keyFn = typeof key === 'function' ? key : (item: V): any => (item as any)[key]
    const groups = createGrouping(items, keyFn)

    // return collectors
    return Object.freeze({
      asArrays: asArraysFactory(groups),
      asEntries: asEntriesFactory(groups),
      asMap: asMapFactory(groups),
      asObject: asObjectFactory(groups),
      asTuples: asTuplesFactory(groups),
      keys: keysFactory(groups)
    })
  }

  return Object.freeze({ by })
}
