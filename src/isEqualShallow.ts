const hasOwn = {}.hasOwnProperty;

function isEqualShallow(a: any, b: any): boolean {
  if (typeof a === 'function') {
    return true;
  }
  if (typeof a !== 'object') {
    return a === b;
  }

  if (a === b) return true;
  if (!a || !b) return false;

  const akeys = Object.keys(a);
  const bkeys = Object.keys(b);

  if (akeys.length !== bkeys.length) return false;

  let n = akeys.length;

  while (n--) {
    const k = akeys[n];

    if (!hasOwn.call(b, k) || a[k] !== b[k]) {
      if (typeof a[k] === 'function' && typeof b[k] === 'function') {
        continue;
      }
      return false;
    }
  }

  return true;
}

export default isEqualShallow;
