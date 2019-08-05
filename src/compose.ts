// 执行后返回一个方法

export default function compose(...funcs: any[]) {
  if (funcs.length === 0) {
    return (arg: unknown) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }

  funcs.reduce((a, b) => (...arg: any[]) => a(b(...arg)));
}
