# group-items

[![CI](https://github.com/meyfa/group-items/actions/workflows/main.yml/badge.svg)](https://github.com/meyfa/group-items/actions/workflows/main.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5935873a1c2a7f1ac334/test_coverage)](https://codeclimate.com/github/meyfa/group-items/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/5935873a1c2a7f1ac334/maintainability)](https://codeclimate.com/github/meyfa/group-items/maintainability)

`group-items` is a TypeScript/JavaScript module for grouping arrays by some
key, primitive or complex, and into whatever structure you desire.

Example:

```js
import { group } from 'group-items'

// group names by length
const items = ['James', 'John', 'Robert', 'Michael', 'William', 'David']
const byLength = group(items).by('length').asObject()

console.log(byLength)
```

```js
{
  4: ['John'],
  5: ['James', 'David'],
  6: ['Robert'],
  7: ['Michael', 'William']
}
```

This module can do a lot more though, as the keying can also be dynamically
generated and there are other collectors in addition to `.asObject()`.


## Usage

```js
// ESM / TypeScript:
import { group } from 'group-items'

// CommonJS:
const { group } = require('group-items')
```

The basic workflow is as follows:

1. Start a grouping: `group(Iterable)`
2. Provide a keying: `.by('property')` or `.by((item, index) => fn(item, index))`
3. Collect the results: `.asObject()`, `.asTuples()`, `.keys()`, etc.

### 1. Group creation

Syntax: `group(Iterable)`, where `group` is the main export of this module.
Because this method takes an `Iterable`, you can give it arrays, sets, strings,
... and it will just work.

### 2. Keying

There are two ways of providing a keying:

* (A) by property name, or
* (B) by function.

You've seen an example for (A) in the code snippet above, where the `length`
property was used to group strings. Examples for (B) can be found at the end
of this document (in the Examples section). Put simply, you would provide a
function that -- when given an element of the input `Iterable` -- computes
some value that can be used as the key for that element.
Later I will demonstrate the power of this concept.

Note that *almost anything* can be used as key. Key equality (and thereby
grouping) is determined as per the
[deep-eql](https://github.com/chaijs/deep-eql) module.

### 3. Collection

After a grouping has been initialized and keyed, it can be collected in one of
many ways:

`.asArrays()`

collects into an array of arrays (each child array is a group).
E.g. if grouping integers by whether they are even or odd, the output might be:
`[[0, 2, 4, 6, 8], [1, 3, 5, 7, 9]]`.

`.asEntries(options)`

collects into an array of `{ key: <key>, items: [...] }` objects. This is one
of the more verbose collectors, but sometimes useful. The property names can be
customized.

Options:

- `keyName`: name of the key property (default: `'key'`)
- `itemsName`: name of the items property (default: `'items'`)

_Note that due to limitations of the TypeScript language, the return type of
this method cannot be inferred correctly when customizing property names. In
those cases, an array of `Record` will be returned which you have to cast
yourself._

`.asMap()`

collects into a JavaScript
[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map),
as you would expect. Maps have the advantage of supporting non-primitive keys.

`.asObject()`

collects into a JavaScript `Object`. You can find an example for this above.
Note that due to the nature of JavaScript objects, only values of type
`string`, `number` or `symbol` will be included in the result.

`.asTuples()`

collects into an array of 2-tuples, i.e., an array of the following form:

```js
[
  [keyA, [itemA_0, itemA_1, itemA_2, /* etc ... */]],
  [keyB, [itemB_0, itemB_1, itemB_2, /* etc ... */]],
  // etc ...
]
```

`.keys()`

collects just the group keys into an array.


## Examples

You've seen one example already. Here are a few more, demonstrating the
capabilities.

### Grouping numbers by remainder

```js
group([0, 1, 2, 3, 4, 5])
  .by(i => i % 3)
  .asObject()
```

```js
{
  0: [0, 3],
  1: [1, 4],
  2: [2, 5]
}
```

### Grouping events by date

```js
const events = [
  { date: [2020, 3,  1], title: 'EDC Mexico' },
  { date: [2020, 3, 21], title: 'Ultra Music Festival (ASOT)' },
  { date: [2020, 3, 21], title: 'This Is Me' },
  { date: [2020, 3, 29], title: 'Creamfields' },
  //...
]

group(events).by('date').asMap()
```

```js
Map {
  [2020, 3, 1] => [ { date: [2020, 3, 1], title: 'EDC Mexico' } ],
  [2020, 3, 21] => [
    { date: [2020, 3, 21], title: 'Ultra Music Festival (ASOT)' },
    { date: [2020, 3, 21], title: 'This Is Me' }
  ],
  [2020, 3, 29] => [ { date: [2020, 3, 29], title: 'Creamfields' } ]
}
```

Or alternatively:

```js
group(events).by('date').asEntries({ keyName: 'date', itemsName: 'events' })
```

```js
[
  { date: [2020, 3, 1], events: [ /* ... */ ] },
  { date: [2020, 3, 21], events: [ /* ... */ ] },
  { date: [2020, 3, 29], events: [ /* ... */ ] }
]
```

### Obtaining all unique Map values

This is certainly not the most efficient (or readable) way to do it, but you get
the idea.

```js
// initialize some mappings
const map = new Map([
  [0, 'foo'], [2, 'foo'], [3, 'bar'], [8, 'foo'], [9, 'qux'], [11, 'bar']
])

// create a reverse map (map each value to its respective keys)
group(map).by(entry => entry[1]).keys()
```

```js
['foo', 'bar', 'qux']
```

### Alternated string chunking

The following example makes use of the element index for grouping.

```js
group('ax1by2cz3')
  // create chunks by alternating every 3rd character
  .by((char, index) => index % 3)
  .asArrays()
  // now join the inner arrays
  .map((arr) => arr.join(''))
```

```js
['abc', 'xyz', '123']
```
