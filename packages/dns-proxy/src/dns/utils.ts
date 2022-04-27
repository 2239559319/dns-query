import type { Flag, Word } from './base';

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
    rcode,
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
