type Test<T, U> = T extends U ? 5 : 'a';

type Result = Test<1 | 2, 1>; // 5 | "a" // extends both

// i.e. resolved as: Test<1 | 2, U> = 1 extends U ? 5 : "a" | 2 extends U ? 5 : "a";

type BoxedValue<T> = {value: T};
type BoxedArray<T> = {array: T[]};
type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;

type T20 = Boxed<string>; // BoxedValue<string>;
type T21 = Boxed<number[]>; // BoxedArray<number>;
type T22 = Boxed<string | number[]>; // BoxedValue<string> | BoxedArray<number>;

///////

type Diff<T, U> = T extends U ? never : T; // Remove types from T that are assignable to U
type T30 = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // "b" | "d"

type Filter<T, U> = T extends U ? T : never; // Remove types from T that are not assignable to U
type T31 = Filter<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // "a" | "c"
