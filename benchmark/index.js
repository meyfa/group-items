const benchmark = require('@jsperf.dev/benchmark').default
const path = require('node:path')
const { faker } = require('@faker-js/faker')

benchmark.samples = 100

benchmark.beforeAll((context) => {
  // random seed, but hardcoded to make benchmarks reproducible
  faker.seed(6676776800545831)
  Object.assign(context, {
    numbers: Array.from({ length: 10_000 }, (_, i) => i),
    objects: Array.from({ length: 10_000 }, () => ({
      cellName: faker.music.genre(),
      name: faker.name.fullName(),
      test: faker.lorem.paragraph()
    })),
    objectKeys: Array.from({ length: 1_000 }, () => ({
      date: {
        year: 2022,
        month: faker.datatype.number({ min: 0, max: 11 }),
        day: faker.datatype.number({ min: 1, max: 31 })
      },
      payload: faker.datatype.array(10)
    }))
  })
})

benchmark.run('remainder', path.resolve(__dirname, 'remainder.js'))
benchmark.run('object-attribute', path.resolve(__dirname, 'object-attribute.js'))
benchmark.run('object-callback', path.resolve(__dirname, 'object-callback.js'))
benchmark.run('complex-key', path.resolve(__dirname, 'complex-key.js'))
