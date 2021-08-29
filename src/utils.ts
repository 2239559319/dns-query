import {
  Binary,
  Header,
  Flag,
  Question,
  Qtype,
  QClass,
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
export function numberToUintArray(num: number, bitLength: 8 | 16 = 16): Uint8Array {
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
 * @param {boolean} pretty
 * @return {string}
 */
export function uint8ArrayToHex(arr: Uint8Array, pretty?: boolean): string {
  let res = '';
  for (const num of arr) {
    if (pretty) {
      res += `${byteToHex(num)} `;
    } else {
      res += byteToHex(num);
    }
  }
  return res.trimEnd();
}
/**
 *
 * @param {string} domain
 * @return {Uint8Array}
 */
export function domainToUintArray(domain: string): Uint8Array {
  const arr = domain.split('.');
  const buf = Buffer.alloc(domain.length + 2);
  let offset = 0;
  for (const str of arr) {
    buf.writeUInt8(str.length, offset++);
    for (const char of str) {
      buf.writeUInt8(char.charCodeAt(0), offset++);
    }
  }
  buf.writeUInt8(0, offset);
  return new Uint8Array(buf);
}

/**
 * @return {Uint8Array}
 */
export function generateID(): Uint8Array {
  const r = Math.floor(Math.random() * 2 ** 16);
  return numberToUintArray(r);
}
/**
 * generate request flag
 * @param {Flag} flag
 * @return {Uint8Array}
 */
export function generateFlag(flag?: Flag): Uint8Array {
  const {
    qr = 0,
    opcode = 0,
    aa = 0,
    tc = 0,
    rd = 1,
    ra = 0,
    z = 0,
    rcode = 0,
  } = flag || {};
  const num =
    (qr << 15) |
    (opcode << 11) |
    (aa << 10) |
    (tc << 9) |
    (rd << 8) |
    (ra << 7) |
    (z << 4) |
    rcode;
  return numberToUintArray(num);
}
/**
 *
 * @return {Header}
 */
export function generateHeader(): Header {
  const res: Header = {
    id: generateID(),
    flags: generateFlag(),
    qdCount: numberToUintArray(1),
    anCount: numberToUintArray(0),
    nsCount: numberToUintArray(0),
    arCount: numberToUintArray(0),
  };
  return res;
}
/**
 *
 * @param {Header} header
 * @return {Uint8Array}
 */
function headerToUint8Arr(header: Header): Uint8Array {
  const res = [];
  res.push(...header.id);
  res.push(...header.flags);
  res.push(...header.qdCount);
  res.push(...header.anCount);
  res.push(...header.nsCount);
  res.push(...header.arCount);
  return new Uint8Array(res);
}
/**
 *
 * @param {Question} q
 * @return {Uint8Array}
 */
function questionToUint8Arr(q: Question): Uint8Array {
  const res = [];
  res.push(...q.qName);
  res.push(...q.qType);
  res.push(...q.qClass);
  return new Uint8Array(res);
}

/**
 * @param {string} domain
 * @return {Uint8Array}
 */
export function generateRequest(domain: string): Uint8Array {
  const header = generateHeader();
  const question: Question = {
    qName: domainToUintArray(domain),
    qType: numberToUintArray(Qtype.A),
    qClass: numberToUintArray(QClass.IN),
  };
  return new Uint8Array([...headerToUint8Arr(header), ...questionToUint8Arr(question)]);
}
