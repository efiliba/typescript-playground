import type {Equal, Expect} from '@type-challenges/utils';

type ConcatOriganal<T, U> = any;

type ConcatConstraintToArray<T extends any[], U extends any[]> = []; // T and U must be arrays
// Concat<1, 2> -> Error: Type 'number' does not satisfy the constraint 'any[]'

type Concat<T extends any[], U extends any[]> = [...T, ...U];

type Result = Concat<[1], [2]>; // [1, 2]

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<[1, 2], [3, '4']>, [1, 2, 3, '4']>>,
  Expect<
    Equal<
      Concat<['1', 2, '3'], [false, boolean, '4']>,
      ['1', 2, '3', false, boolean, '4']
    >
  >
];
