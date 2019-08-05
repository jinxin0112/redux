// 执行后返回一个方法
type AnyFunction = (...arg: any[]) => any;

export default function compose(...funcs: AnyFunction[]) {
  if (funcs.length === 0) {
    return (arg: unknown) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }

  funcs.reduce((a, b) => {
    return (...arg) => {
      return a(b(...arg));
    };
  });
}
