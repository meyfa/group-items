import { expect } from 'chai'

import { group } from '../src/group'

describe('group.ts', function () {
  it("has function property 'by'", function () {
    expect(group([])).to.have.property('by').that.is.a('function')
  })

  it('does not create groups for empty input', function () {
    expect(group([]).by((a) => a).asEntries()).to.be.an('array').with.lengthOf(0)
  })

  it('correctly groups primitives with identity', function () {
    expect(group([1, 2, 3]).by((i) => i).asEntries()).to.deep.equal([
      { key: 1, items: [1] },
      { key: 2, items: [2] },
      { key: 3, items: [3] }
    ])
  })

  it('correctly groups primitives with simple keying', function () {
    expect(group([0, 1, 2, 3, 4]).by((i) => i % 2).asEntries()).to.deep.equal([
      { key: 0, items: [0, 2, 4] },
      { key: 1, items: [1, 3] }
    ])
  })

  it('correctly groups strings by length property', function () {
    expect(group(['a', 'b', 'aaa', 'bbbb', 'cccc']).by('length').asEntries()).to.deep.equal([
      { key: 1, items: ['a', 'b'] },
      { key: 3, items: ['aaa'] },
      { key: 4, items: ['bbbb', 'cccc'] }
    ])
  })

  it('correctly groups arrays by identity', function () {
    expect(group([[1, 2], [1, 2], [], [5]]).by((i) => i).asEntries()).to.deep.equal([
      { key: [1, 2], items: [[1, 2], [1, 2]] },
      { key: [], items: [[]] },
      { key: [5], items: [[5]] }
    ])
  })

  it('correctly groups objects by identity', function () {
    const obj0 = { a: 1 }
    const obj1 = { a: 1 }
    const obj2 = { a: 2 }
    const obj3 = {}
    const result = group([obj0, obj1, obj2, obj3]).by((o) => o).asEntries()
    // expect 3 groups
    expect(result).to.be.an('array').with.lengthOf(3)
    // first group
    expect(result[0].key).to.deep.equal({ a: 1 })
    expect(result[0].items).to.have.lengthOf(2)
    expect((result[0].items as any[])[0]).to.equal(obj0)
    expect((result[0].items as any[])[1]).to.equal(obj1)
    // second group
    expect(result[1].key).to.deep.equal({ a: 2 })
    expect(result[1].items).to.have.lengthOf(1)
    expect((result[1].items as any[])[0]).to.equal(obj2)
    // third group
    expect(result[2].key).to.deep.equal({})
    expect(result[2].items).to.have.lengthOf(1)
    expect((result[2].items as any[])[0]).to.equal(obj3)
  })

  it('correctly groups objects by some property', function () {
    const obj0 = { a: 1, b: 2 }
    const obj1 = { a: 1, b: 5 }
    const obj2 = { a: 2, b: 2 }
    const result = group([obj0, obj1, obj2]).by('a').asEntries()
    // expect 2 groups
    expect(result).to.be.an('array').with.lengthOf(2)
    // first group
    expect(result[0].key).to.equal(1)
    expect(result[0].items).to.have.lengthOf(2)
    expect(result[0].items[0]).to.equal(obj0)
    expect(result[0].items[1]).to.equal(obj1)
    // second group
    expect(result[1].key).to.equal(2)
    expect(result[1].items).to.have.lengthOf(1)
    expect(result[1].items[0]).to.equal(obj2)
  })

  it('supports string as input', function () {
    expect(group('abcdefg').by((c) => c.charCodeAt(0) % 2).asEntries()).to.deep.equal([
      { key: 1, items: ['a', 'c', 'e', 'g'] },
      { key: 0, items: ['b', 'd', 'f'] }
    ])
  })

  it('supports Set as input', function () {
    expect(group(new Set([0, 1, 2, 3, 4])).by((i) => i % 2).asEntries()).to.deep.equal([
      { key: 0, items: [0, 2, 4] },
      { key: 1, items: [1, 3] }
    ])
  })

  it('supports Map as input', function () {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'a']])
    expect(group(map).by((e) => e[1]).asEntries()).to.deep.equal([
      { key: 'a', items: [[1, 'a'], [3, 'a']] },
      { key: 'b', items: [[2, 'b']] }
    ])
  })
})
