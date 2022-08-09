type Push<T extends number[], U extends number> = [...T, U];

type Range<N extends number, A extends number[] = []> = N extends A['length'] ? A : Range<N, Push<A, A['length']>>;

type TestRange = Range<4>; // [0, 1, 2, 3]

type Subtract<A extends number, B extends number> = Range<A> extends [...Range<B>, ...infer T] ? T['length'] : never;

type Num<T> = Extract<T, number>; // Cast to number
type NumArray<T> = Extract<T, number[]>; // Cast to number

// A.length === 1 -> A
// [F, S, ...R] = A
// BS(
//   F > S === never
//     ? [F, ...BS([S, ...R])]
//     : [S, ...BS([F, ...R])],
//   L - 1
// )
type BubbleSort<A extends number[], L extends number = A['length']> = L extends 1
  ? A
  : A extends [infer F, infer S, ...infer R]
  ? BubbleSort<
      Subtract<Num<F>, Num<S>> extends never
        ? [Num<F>, ...BubbleSort<[Num<S>, ...NumArray<R>]>]
        : [Num<S>, ...BubbleSort<[Num<F>, ...NumArray<R>]>],
      Subtract<L, 1>
    >
  : never;

type TestBubbleSort = BubbleSort<[2, 5, 3, 6, 1, 4]>;
