import {
  Binary,
  Header,
  Flag,
} from './protocol';

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
/**
 * @return {Uint8Array}
 */
export function generateID(): Uint8Array {
  const r = Math.floor(Math.random() * 2 ** 16);
  return numberToUintArray(r, 16);
}
/**
 * generate request flag
 * @param {Flag} flag
 * @return {Uint8Array}
 */
export function generateFlag(flag: Flag | {}): Uint8Array {
  const {
    qr = 0,
    opcode = 0,
    aa = 0,
    tc = 0,
    rd = 1,
    ra = 0,
    z = 0,
    rcode = 0,
  } = flag as Flag;
  const num =
    (qr << 15) &
    (opcode << 11) &
    (aa << 10) &
    (tc << 9) &
    (rd << 8) &
    (ra << 7) &
    (z << 4) &
    rcode;
  return numberToUintArray(num, 16);
}
/**
 *
 * @return {Header}
 */
export function generateHeader(): Header {
  const res: Header = {
    id: generateID(),
    flags: generateFlag({}),
    qdCount: numberToUintArray(1, 16),
    anCount: numberToUintArray(0, 16),
    nsCount: numberToUintArray(0, 16),
    arCount: numberToUintArray(0, 16),
  };
  return res;
}
