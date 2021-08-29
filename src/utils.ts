type Binary = 0 | 1;
/**
 *
 * @param {number} num
 * @param {8 | 16} bitLength
 * @return {Binary[]}
 */
export function binaryToArr(num: number, bitLength: 8 | 16): Binary[] {
  const res = [];
  for (let i = 0; i < bitLength; i++) {
    const bit = (num >>> i) & 1;
    res.push(bit);
  }
  return res.reverse();
}
/**
 * @param {number} num
 * @param {8 | 16} bitLength
 * @return {Uint8Array}
 */
export function numberToUintArray(num: number, bitLength: 8 | 16): Uint8Array {
  if (bitLength === 8) {
    const buf = Buffer.alloc(1);
    buf.writeUInt8(num);
    return new Uint8Array(buf);
  } else {
    const buf = Buffer.alloc(2);
    buf.writeUInt16BE(num);
    return new Uint8Array(buf);
  }
}
/**
 *
 * @param {number} num 8 bit number
 * @return {string}
 */
export function byteToHex(num: number): string {
  const res = num.toString(16);
  if (res.length === 1) {
    return `0${res}`;
  }
  return res;
}
/**
 *
 * @param {Uint8Array} arr
 * @return {string}
 */
export function uint8ArrayToHex(arr: Uint8Array): string {
  let res = '';
  for (const num of arr) {
    res += byteToHex(num);
  }
  return res;
}
