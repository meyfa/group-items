import { expect } from 'chai'

import { asEntriesFactory } from '../../src/collectors/as-entries'

describe('collectors/as-entries.ts', function () {
  it('returns empty array for empty input', function () {
    const collector = asEntriesFactory([])
    expect(collector()).to.deep.equal([])
  })

  it('returns array of entries', function () {
    const collector = asEntriesFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    expect(collector()).to.deep.equal([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
  })

  it('ignores empty options object', function () {
    const collector = asEntriesFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    expect(collector({})).to.deep.equal([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
  })

  it('allows specifying keyName option', function () {
    const collector = asEntriesFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    expect(collector({ keyName: 'foo' })).to.deep.equal([
      { foo: 1, items: [1, 2, 3] },
      { foo: 2, items: [4, 5, 6] }
    ])
  })

  it('allows specifying itemsName option', function () {
    const collector = asEntriesFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    expect(collector({ itemsName: 'bar' })).to.deep.equal([
      { key: 1, bar: [1, 2, 3] },
      { key: 2, bar: [4, 5, 6] }
    ])
  })

  it('allows specifying both keyName and itemsName options', function () {
    const collector = asEntriesFactory([
      { key: 1, items: [1, 2, 3] },
      { key: 2, items: [4, 5, 6] }
    ])
    expect(collector({ keyName: 'foo', itemsName: 'bar' })).to.deep.equal([
      { foo: 1, bar: [1, 2, 3] },
      { foo: 2, bar: [4, 5, 6] }
    ])
  })
})
