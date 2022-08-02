type Contains<A extends any[], B extends any[]> = A extends [...B, ...infer T] ? true : false;

type TestContains = Contains<[0, 1, 2, 3, 4], [0, 1, 2]>; // true
type TestContains2 = Contains<[0, 1, 2], [0, 1, 2, 3, 4]>; // false
