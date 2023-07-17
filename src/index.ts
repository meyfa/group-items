// export group function and required types
export { group, type Groupable, type Collectable, type KeyingFunction } from './group.js'

// export collector results
export type { ArraysCollection } from './collectors/as-arrays.js'
export type { EntriesCollectorOptions, EntriesCollection } from './collectors/as-entries.js'
export type { MapCollection } from './collectors/as-map.js'
export type { ObjectCollection } from './collectors/as-object.js'
export type { TuplesCollection } from './collectors/as-tuples.js'
export type { KeysCollection } from './collectors/keys.js'
