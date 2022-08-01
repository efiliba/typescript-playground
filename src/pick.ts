import type {Equal, Expect} from '@type-challenges/utils';

type OriginalMyPick<T, K> = any;

type CheatMyPick<T, K extends keyof T> = Pick<T, K>; // Keys must be in the T object

type MyPickAttempt<T, K extends keyof T> = {
  [S in keyof T]: T[S]; // For each key in T -> get the Specific key with it's type
};

type AttemptResult = MyPickAttempt<{a: number; b: number}, 'a'>; // {a: number; b: number;} - returned all the keys

type MyPick<T, K extends keyof T> = {
  [S in K]: T[S];
};

type Result = MyPick<{a: number; b: number}, 'a'>; // {a: number;}

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type cases = [
  Expect<Equal<{title: string}, MyPick<Todo, 'title'>>>,
  Expect<Equal<{title: string; completed: boolean}, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error todo
  MyPick<Todo, 'title' | 'completed' | 'invalid'>
];
