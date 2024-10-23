// unknown extends `any` is true; unknown extends `any[]` is false
type ToArray<T = []> = unknown extends T ? [T] : T extends any[] ? T : [T];

type Push2<T, A> = [...ToArray<T>, ...ToArray<A>];

type P1 = Push2<[], 5>; // [5]
type P2 = Push2<2, 5>; // [2, 3]
type P3 = Push2<[], 5>; //
type P4 = Push2<[], 5>; //

// type NTuple<N>
