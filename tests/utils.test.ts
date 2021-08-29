import {
  binaryToArr,
  numberToUintArray,
  byteToHex,
  uint8ArrayToHex,
  domainToUintArray,
  generateRequest,
} from '../src/utils';

describe('test binaryToArr function', () => {
  it('test 8 bit num', () => {
    const arr = binaryToArr(0b00000100, 8);
    expect(arr).toHaveLength(8);
    expect(arr).toEqual([0, 0, 0, 0, 0, 1, 0, 0]);
  });
  it('test 16 bit num', () => {
    const arr = binaryToArr(0b0000010000000100, 16);
    expect(arr).toHaveLength(16);
    expect(arr).toEqual([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]);
  });
});

describe('test numberToUintArray function', () => {
  it('test 8 bit', () => {
    const res = numberToUintArray(0b00000100, 8);
    expect(res).toHaveLength(1);
    expect(res[0]).toBe(0b00000100);
  });
  it('test 16 bit', () => {
    const res = numberToUintArray(0b0000100000000100, 16);
    expect(res).toHaveLength(2);
    expect(res[0]).toBe(0b00001000);
    expect(res[1]).toBe(0b00000100);
  });
});

describe('test byteToHex function', () => {
  it('test func', () => {
    const res = byteToHex(0b10000001);
    expect(res).toBe('81');
  });
});

describe('test uint8arrayToHex func', () => {
  it('test', () => {
    const num = 0b0000100000000100;
    const hex = uint8ArrayToHex(numberToUintArray(num, 16));
    expect(hex).toBe('0804');
  });
});

describe('test domainToUintArray func', () => {
  it('test', () => {
    const str = 'scu.edu.cn';
    const uintArr = domainToUintArray(str);
    const hex = uint8ArrayToHex(uintArr);
    expect(hex).toEqual('037363750365647502636e00');
  });
});

describe('test generate request', () => {
  it('test', () => {
    const uintArr = generateRequest('scu.edu.cn');
    const hex = uint8ArrayToHex(uintArr, true);
    expect(uintArr).not.toBeNull();
    expect(hex).not.toBeNull();
  });
});
