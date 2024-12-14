import deepEql from 'deep-eql'

import type { Grouping } from './types.js'
import { type ArraysCollector, asArraysFactory } from './collectors/as-arrays.js'
import { asEntriesFactory, type EntriesCollector } from './collectors/as-entries.js'
import { asMapFactory, type MapCollector } from './collectors/as-map.js'
import { asObjectFactory, type ObjectCollector } from './collectors/as-object.js'
import { asTuplesFactory, type TuplesCollector } from './collectors/as-tuples.js'
import { type KeysCollector, keysFactory } from './collectors/keys.js'

export type KeyingFunction<K, V> = (t: V, idx: number) => K

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

/**
 * Container for items to be grouped. Continue by defining the keying function.
 */
export interface Groupable<V> {
  readonly by: GroupingFunction<V>
}

/**
 * Grouping of items by key. The contents can be collected in a variety of formats.
 */
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

  // Optimization to allow constant-time lookup of groups by key. Note: May become linear in case of many collisions.
  const groupsByKeyHash = new Map<any, Grouping<K, V>>()

  let idx = 0
  for (const item of items) {
    const itemKey = keyFn(item, idx)
    idx++

    // Get the array of groups with identical key hash ("same-hash groups").
    const itemKeyHash = typeof itemKey === 'object' ? JSON.stringify(itemKey) : itemKey
    let sameHashGroups = groupsByKeyHash.get(itemKeyHash)
    if (sameHashGroups == null) {
      sameHashGroups = []
      groupsByKeyHash.set(itemKeyHash, sameHashGroups)
    }

    // Compare the key of each same-hash group.
    let found = false
    for (const group of sameHashGroups) {
      if (deepEql(group.key, itemKey)) {
        group.items.push(item)
        found = true
        break
      }
    }

    // If no result was found, create a new group.
    if (!found) {
      const group = { key: itemKey, items: [item] }
      groups.push(group)
      sameHashGroups.push(group)
    }
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
