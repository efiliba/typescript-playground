import type {GreaterThan, Sub, Num} from './maths';

type BubbleSort<A extends any[], L extends number = A['length']> = L extends 1  // Terminating condition: A length L = 1
  ? A                                                                           // Only 1 element in Array? -> return it
  : A extends [infer F, infer S, ...infer R] // Split elements
  ? BubbleSort<
      [
        ...(GreaterThan<Num<F>, Num<S>> extends true                            // Determine which part to sort next
          ? [S, ...BubbleSort<[F, ...R], Sub<L, 1>>]
          : [F, ...BubbleSort<[S, ...R], Sub<L, 1>>]
        )
      ],
      Sub<L, 1>
    >
  : never;

type Result = BubbleSort<[3, 2, 4, 1, 6, 5]>; // [1, 2, 3, 4, 5, 6]
type Result2 = BubbleSort<[234, 43, 55, 63, 5, 6, 235, 547]>; // [5, 6, 43, 55, 63, 234, 235, 547]
type Result_NOT_WORKING = BubbleSort<['c', 'a', 'd', 'b']>; // Only works for numbers ???
