// Our dependency deep-eql is missing type definitions.
// This file adds very basic ones, but they should suffice to fix compiler errors.

declare module 'deep-eql' {
  export default function (a: any, b: any): boolean
}
