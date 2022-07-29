import type {Equal, Expect} from '@type-challenges/utils';

type Union = 'a' | 'b' | (string extends string ? 'c' : never);

type cases = [Expect<Equal<Union, 'a' | 'b' | 'c'>>];

// type Test<T extends any[]> = T extends [infer First, string] ? First : never;

// type Result = Test<['a', 'b']>;

// type Test2<T extends any[]> = T extends [infer First, ...any[]] ? First : never;

// type Result2 = Test2<['a', 'b']>;
