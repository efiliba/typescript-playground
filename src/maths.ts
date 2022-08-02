type Push<T extends any[], V> = [...T, V];

type PushResult = Push<[1], 'a'>; // [1, "a"]

// Convert a number N into a tuple of length N
type NTuple<N extends number, T extends any[] = []> = N extends T['length'] ? T : NTuple<N, Push<T, any>>;

type NTupleResult = NTuple<3>; // [any, any, any]

// 1. T['length'] extends N -> is the length of T (i.e. 0) 3 ? return NTuple<3, [any]>
// 2.   length of T is now 1 -> return NTuple<3, [any, any]>
// 3.   T['length'] = 2 -> return NTuple<3, [any, any, any]>
// 2.   T['length'] = 3 -> return 3

type Length<T extends any[]> = T['length'];

type NTupleResultLength = Length<NTupleResult>; // 3 or NTupleResult['length']

type Add<M extends number, N extends number> = Length<[...NTuple<M>, ...NTuple<N>]>;

type AddResult = Add<2, 5>; // 7

export type Sub<M extends number, N extends number> = NTuple<M> extends [...infer T, ...NTuple<N>] ? Length<T> : never;

type SubResult = Sub<5, 2>; // 3

// Convert 5 into an array [any, any, any, any, any] and assign them to T and NTuple<N>
//   i.e. NTuple<N> assigned [any, any] and remaining to T param
// If not assignable - N > M returns never

// Check if M < N
export type LessThan<M extends number, N extends number> = Sub<M, N> extends never ? true : false;

type CompareResult = LessThan<1, 2>; // true - 1 comes before 2
type CompareResult2 = LessThan<2, 1>; // false
type CompareResult3 = LessThan<2, 2>; // false

// Check if M > N
export type GreaterThan<M extends number, N extends number> = Sub<N, M> extends never ? true : false;

type CompareGreater = GreaterThan<1, 2>; // false
type CompareGreater2 = GreaterThan<2, 1>; // true
type CompareGreater3 = GreaterThan<2, 2>; // false

// export type Compare<N1 extends number, N2 extends number> = N1 extends N2
//   ? false
//   : [Sub<N2, N1>] extends [never] // inside tuple to prevent expanding ???
//     ? true
//     : false;

export type Num<T> = Extract<T, number>; // Cast to number

type NumResult = Num<5>; // 5
type NumResult2 = Num<'5'>; // never
