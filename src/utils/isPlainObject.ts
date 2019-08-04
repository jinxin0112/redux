function isPlainObject(obj: object): boolean {
  if (typeof obj !== 'object' || obj === null) return false;
  if (Object.getPrototypeOf(obj) === null) return true;

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}
