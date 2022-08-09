// https://www.youtube.com/watch?v=iWkfnbdM25M

const fib = (n: number): number => {
  if (n <= 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
};

const delayedSum = (a: number, b: number): Promise<number> =>
  new Promise(resolve => setTimeout(() => resolve(a + b), 1000));

type AnyFunction = (...args: any[]) => any;

const latency = <Fn extends AnyFunction>(fn: Fn, label: string) => {
  return (...args: Parameters<Fn>): ReturnType<Fn> => {
    const start = Date.now(); // performance.now();
    const result = fn(...args);
    console.log(`${label} execution time`, Date.now() - start);
    return result;
  };
};

const timedFib = latency(fib, 'fib');
// console.log(timedFib(40));

(async function () {
  const timedSum = latency(delayedSum, 'sum'); // sum execution time 0 - need to move await into latency function
  console.log(await timedSum(10, 20));
})();

const latencyAsync = <Fn extends AnyFunction>(fn: Fn, label: string) => {
  return async (...args: Parameters<Fn>): Promise<ReturnType<Fn>> => {
    // return async (...args: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> => {
    const start = Date.now(); // performance.now();
    const result = await fn(...args);
    console.log(`${label} execution time`, Date.now() - start);
    return result;
  };
};

(async function () {
  const timedSum = latencyAsync(delayedSum, 'async sum'); // async sum execution time 1002 :Promise<Promise<number>> ???
  console.log(await timedSum(10, 20));
})();

// Need to return Promise<Awaited<ReturnType<Fn>>> to unwrap Promise and then re-wrap
