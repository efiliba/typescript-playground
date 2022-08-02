type Difference<A extends any[], B extends any[]> = A extends [...B, ...infer T]
  ? T
  : B extends [...A, ...infer T]
    ? T
    : never;

type TestDifference = Difference<[0, 1, 2, 3, 4], [0, 1, 2]>; // [3, 4]
type TestDifference2 = Difference<[0, 1, 2], [0, 1, 2, 3, 4]>; // [3, 4]
