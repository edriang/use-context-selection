import isEqualShallow from './isEqualShallow';

describe('isEqualShallow', () => {
  it('returns true if 2 objects are strictly identical', () => {
    const object = {};
    const result = isEqualShallow(object, object);

    expect(result).toBeTruthy();
  });

  it('returns true if 2 objects are identical in shape', () => {
    const object1 = {
      a: 'A',
      b: 'B',
    };
    const object2 = {
      a: 'A',
      b: 'B',
    };
    const result = isEqualShallow(object1, object2);

    expect(result).toBeTruthy();
  });

  it('returns true if 2 objects are identical in shape and references', () => {
    const c = { c: 'C' };
    const object1 = {
      a: 'A',
      b: 'B',
      c,
    };
    const object2 = {
      a: 'A',
      b: 'B',
      c,
    };
    const result = isEqualShallow(object1, object2);

    expect(result).toBeTruthy();
  });

  it('returns false if 2 objects are identical in shape but contain different references', () => {
    const object1 = {
      a: 'A',
      b: 'B',
      c: { c: 'C' },
    };
    const object2 = {
      a: 'A',
      b: 'B',
      c: { c: 'C' },
    };
    const result = isEqualShallow(object1, object2);

    expect(result).toBeFalsy();
  });

  it('ignores function values', () => {
    const object1 = {
      a: 'A',
      f: () => {},
    };
    const object2 = {
      a: 'A',
      f: () => {},
    };
    const result = isEqualShallow(object1, object2);

    expect(result).toBeTruthy();
  });

  it('compares array values', () => {
    const array1 = [1, 2, 3, 4];
    const array2 = [1, 2, 3, 4];
    const result = isEqualShallow(array1, array2);

    expect(result).toBeTruthy();
  });

  it('compares primitive number values', () => {
    const number1 = 10;
    const number2 = 10;
    const result = isEqualShallow(number1, number2);

    expect(result).toBeTruthy();
  });

  it('compares primitive string values', () => {
    const string1 = 'Hello world!';
    const string2 = 'Hello world!';
    const result = isEqualShallow(string1, string2);

    expect(result).toBeTruthy();
  });
});
