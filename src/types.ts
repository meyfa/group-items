export interface GroupingEntry<K, V> {
  key: K
  items: V[]
}

export type Grouping<K, V> = Array<GroupingEntry<K, V>>
