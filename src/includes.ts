import type {Equal, Expect} from '@type-challenges/utils';

type IncludesOriginal<T extends readonly any[], U> = any;

// 1. Get union of all types in array
type IncludesUnionFirst<T extends readonly any[], U> = T[0];
type ResultUnionFirst = IncludesUnionFirst<['a', 'b'], 'c'>; // "a" - type of first element in array

type IncludesUnion<T extends readonly any[], U> = T[number];
type ResultUnion = IncludesUnion<['a', 'b'], 'c'>; // "a" | "b" - union of ALL elements in array

type UnionFirst = ['a', 'b'][0]; // "a" - type of first element in array
type Union = ['a', 'b'][number]; // "a" | "b" - union of ALL elements in array

// First Attempt - i.e. U in union of types of T
type IncludesAttempt<T extends readonly any[], U> = U extends T[number] ? true : false;

type Problem = [boolean, 'b'][0]; // boolean and both true and false in type boolean
type ResultProblem1 = IncludesAttempt<[boolean, 'b'], true>; // true
type ResultRroblem2 = IncludesAttempt<[boolean, 'b'], false>; // true

// 2. Need to check if types are equal
type CustomEqual_ATTEMPT<T, U> = T extends U ? (U extends T ? true : false) : false; // Didn't work

type CustomEqual<T, U> = (<T2>() => T2 extends T ? 1 : 2) extends <T2>() => T2 extends U ? 1 : 2 ? true : false;

// 3. Recursively check each type - check First item equals U, else check Rest
type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R]
  ? CustomEqual<F, U> extends true
    ? true
    : Includes<R, U>
  : false;

type Result = Includes<['a', 'b'], 'b'>; // true
// T extends [infer F, ...infer R] -> T in T, but separate head and tail and assign parameters to them
// until we run out of elements (returning final false)
//   CustomEqual<'a', 'b'> -> false, so recursively check Includes<['b'], 'b'>

type cases = [
  // Replaced imported Equal with CustomEqual (for testing)
  Expect<CustomEqual<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<CustomEqual<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<CustomEqual<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<CustomEqual<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<CustomEqual<Includes<[1, 2, 3], 2>, true>>,
  Expect<CustomEqual<Includes<[1, 2, 3], 1>, true>>,
  Expect<CustomEqual<Includes<[{}], {a: 'A'}>, false>>,
  Expect<CustomEqual<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<CustomEqual<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<CustomEqual<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<CustomEqual<Includes<[{a: 'A'}], {readonly a: 'A'}>, false>>,
  Expect<CustomEqual<Includes<[{readonly a: 'A'}], {a: 'A'}>, false>>,
  Expect<CustomEqual<Includes<[1], 1 | 2>, false>>,
  Expect<CustomEqual<Includes<[1 | 2], 1>, false>>,
  Expect<CustomEqual<Includes<[null], undefined>, false>>,
  Expect<CustomEqual<Includes<[undefined], null>, false>>
];
