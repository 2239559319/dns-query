import type { Flag, Word } from './base';

/**
 * 2byte to hex
 * @param num
 * @returns
 */
export function wordToHex(num: Word) {
  return num.toString(16).padStart(4, '0');
}

export function bufToHex(buf: Buffer) {
  return buf.toString('hex');
}

export function flagToObj(rawFlag: Word): Flag {
  const QR = (rawFlag >>> 15) & 1;
  const Opcode = (rawFlag >>> 11) & 0b1111;
  const AA = (rawFlag >>> 10) & 1;
  const TC = (rawFlag >>> 9) & 1;
  const RD = (rawFlag >>> 8) & 1;
  const RA = (rawFlag >>> 7) & 1;
  const Z = (rawFlag >>> 4) & 0b111;
  const rcode = rawFlag & 0b1111;
  return {
    QR,
    Opcode,
    AA,
    TC,
    RD,
    RA,
    Z,
    rcode
  } as Flag;
}

export function queryNameToString(queryName: Buffer): string {
  const charArr = [];

  let index = 0;
  let count = queryName[0];

  while (index < queryName.length) {
    const isNum = index === 0 || index === 1 + count;
    if (isNum) {
      charArr.push('.');
    } else {
      charArr.push(String.fromCharCode(queryName[index]));
    }
    if (index === 1 + count) {
      count += 1 + queryName[index];
    }
    index++;
  }
  charArr.pop();
  charArr.shift();

  return charArr.join('');
}

export function numToQueryName(num: number): string {
  switch (num) {
    case 1:
      return 'A';
    case 2:
      return 'NS';
    case 3:
      return 'MD';
    case 4:
      return 'MF';
    case 5:
      return 'CNAME';
    case 6:
      return 'SOA';
    case 7:
      return 'MB';
    case 8:
      return 'MG';
    case 9:
      return 'MR';
    case 10:
      return 'NULL';
    case 11:
      return 'WKS';
    case 12:
      return 'PTR';
    case 13:
      return 'HINFO';
    case 14:
      return 'MINFO';
    case 15:
      return 'MX';
    case 16:
      return 'TXT';
    default:
      return 'UNKOWN';
  }
}
