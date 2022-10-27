export interface GroupingEntry<K, V> {
  key: K
  items: V[]
}

export type Grouping<K, V> = Map<K, GroupingEntry<K, V>>
